from unittest import result
from flask import request, jsonify
from flask_cors import cross_origin
import string   
from .home_login import check_token
from flask import Blueprint

group_profile = Blueprint('group_profile', __name__)


@group_profile.route("/group_profile", methods=['POST', 'GET', 'OPTIONS'])
def groupProfile():
    
    from .app import mysql, corsFix
    cursor = mysql.connect().cursor()
    response = jsonify(result="No token")

    # token = request.headers['Authorization']
    token = None
    for (key, val) in request.headers.items():
        if key == "Authorization":
            token = val
    username = ''
    if token:
        username = check_token(token)
        # print("python ---------------")

        if request.method == 'GET':
            if request.args.get("reason") == "check group":
                sql = "SELECT COUNT(1) FROM user_class_group WHERE username = %s and group_code = %s"
                val = (request.args.get("username"), request.args.get("group_code"))
                cursor.execute(sql, val)
                res = cursor.fetchone()
                if res[0] == 1:
                    response = jsonify(result="yes")
                else:
                    response = jsonify(result="no")
            elif token:
                class_code = request.args.get("classcode")
                group_code = request.args.get("group_code")

                # print(class_code,group_code)

                section_id = ''
                group_name = ''
                desc = ''
                members = []
                # true = '1', false = '0'
                isProf = ''
                isInGroup = ''

                # check the if the user is a prof 
                user_query = """SELECT is_professor
                        FROM user
                        WHERE username = %s ;"""
                user = (username,)
                cursor.execute(user_query, user)
                dbUserisProf = cursor.fetchone()
                for user in dbUserisProf:
                    if user == False:
                        isProf = '0'
                        # print('student')
                        # check if the student is in the current group
                        ingroup_query = """SELECT class_code
                                        FROM user_class_group
                                        WHERE username = %s AND group_code = %s;"""
                        ingroup_val = (username, group_code)
                        cursor.execute(ingroup_query, ingroup_val)
                        dbExist = cursor.fetchone()
                        # print(dbExist)
                        if dbExist == None:
                            isInGroup = '0'
                            # print('not exist')
                        else:
                            isInGroup = '1'
                    else:
                        isProf = '1'
                        isInGroup = '0'
                        # print('prof')

                # fetch info from the group
                group_query = """SELECT section_id, group_name, description
                        FROM our_group
                        WHERE group_code = %s AND class_code = %s;"""
                val = (group_code, class_code)
                cursor.execute(group_query, val)
                dbGroup = cursor.fetchall()

                for elem in dbGroup:
                    section_id = elem[0]
                    group_name = elem[1]
                    desc = elem[2]

                # fetch members info
                member_query = """SELECT username, email
                        FROM user
                        WHERE username in(
                            SELECT username 
                            FROM user_class_group
                            WHERE group_code = %s AND class_code = %s);"""
                cursor.execute(member_query, val)
                dbMember = cursor.fetchall()
                print(dbMember)

                # put all members' info to the member list
                for mem in dbMember:
                    memDict = {
                        "username": mem[0],
                        "email": mem[1]
                    }
                    members.append(memDict)
                # print("result-----------")

                response = jsonify(result="200", section_id=section_id, group_name=group_name, desc=desc,
                                   membersList=members, username=username, isInGroup=isInGroup, isProf=isProf)
                # print(response)

            else:
                response = jsonify(result="not logged in")
        elif request.method == 'OPTIONS':
            response = jsonify(result="200")
        elif request.method == 'POST':
            data = request.get_json()
            if data['reason'] == "invite":
                toUser = data['usernameIn']
                group_code = data['group']
                
                #Validate given username
                cursor.execute("SELECT * FROM user WHERE username = %s", toUser)
                if cursor.fetchone() is None or toUser.lower() == username.lower(): 
                    response = jsonify(result = "404")
                    corsFix(response.headers)
                    return response

            
                

                #get group name, class name for use in invite message
                cursor.execute("SELECT group_name, class_code from our_group where group_code = %s", group_code)
                dbResult = cursor.fetchone()
                group_name = dbResult[0]
                class_code = dbResult[1]

                #validate invited is not in a group
                cursor.execute("SELECT group_code FROM user_class_group WHERE username = %s AND class_code = %s" , (toUser, class_code))
                dbResult = cursor.fetchone()
                if dbResult and dbResult[0] is not None:
                    response = jsonify(result = -2)
                    corsFix(response.headers)
                    return response

                #validate invited is not a professor
                cursor.execute("SELECT is_professor FROM user WHERE username = %s", toUser)
                dbResult = cursor.fetchone()
                print(str(dbResult[0]))
                if dbResult[0] == 1:
                    response = jsonify(result = -3)
                    corsFix(response.headers)
                    return response

                #validate user is not already invited
                cursor.execute("SELECT message_id from message WHERE reciever_id = %s AND sender_id = %s AND group_code = %s", (toUser, username, group_code))
                if cursor.fetchone():
                    response = jsonify(result = -4)
                    corsFix(response.headers)
                    return response

                #validate group is not full
                cursor.execute("SELECT current_group_size, max_group_size FROM our_group WHERE group_code = %s", group_code)
                dbResult = cursor.fetchone()
                if dbResult[0] == dbResult[1]:
                    response = jsonify(result = -5)
                    corsFix(response.headers)
                    return response

                #Validate inviter is in group
                cursor.execute("SELECT * FROM user_class_group WHERE username = %s AND class_code = %s AND group_code = %s", (username, class_code, group_code))
                if cursor.fetchone() is None:
                    response = jsonify(result = -1)
                    corsFix(response.headers)
                    return response


                cursor.execute("SELECT class_name from class where class_code = %s", class_code)
                dbResult = cursor.fetchone()
                class_name = dbResult[0]

               
                msg = "You have been invited to join " + group_name + " in class " + class_name  + " by " + username + "."

                #Insert message into the database
                msgTuple = (username, toUser, msg, '1', '1', group_code)
                cursor.execute("INSERT INTO message (sender_id, reciever_id, content, is_unread, is_invite, group_code) values (%s, %s , %s, %s, %s, %s)", msgTuple)
                cursor.connection.commit()

                response = jsonify(result = "200")
            

            elif data['reason'] == "edit description":
                group_code = data['group_code']
                new_desc = data['desc']
                desc_query = """UPDATE our_group
                            SET description = %s
                            WHERE group_code = %s;"""

                newdesc_val = (new_desc, group_code)
                cursor.execute(desc_query, newdesc_val)
                cursor.connection.commit()
                response = jsonify(result="desc updated", new_desc=new_desc)
            elif data['reason'] == "delete member":
                user = data['username']
                group_code = data['group_code']
                cursor.execute(
                    "SELECT * FROM user_class_group WHERE username = %s AND group_code = %s",
                    (user, group_code))
                if cursor.fetchone() is None:
                    response = jsonify(result="invalid")
                    corsFix(response.headers)
                    return response
                else:
                    sql1 = "UPDATE user_class_group SET group_code = NULL WHERE username = %s and group_code = %s"
                    val1 = (data['username'], data['group_code'])
                    cursor.execute(sql1, val1)
                    cursor.connection.commit()
                    sql2 = "UPDATE our_group SET current_group_size = current_group_size - 1 WHERE group_code = %s"
                    val2 = (data['group_code'])
                    cursor.execute(sql2, val2)
                    cursor.connection.commit()
                    cursor.execute("SELECT current_group_size from our_group WHERE group_code = %s", data['group_code'])
                    dbResult = cursor.fetchone()
                    if dbResult and dbResult[0] == 0:
                        cursor.execute("DELETE FROM our_group WHERE group_code = %s", data['group_code'])
                        cursor.connection.commit()
                    else:
                        # Check if leaver is owner
                        cursor.execute("SELECT owner from our_group WHERE group_code = %s", data['group_code'])
                        if user == cursor.fetchone()[0]:
                            # Owner is leaving, assign new owner
                            cursor.execute("SELECT username from user_class_group where group_code = %s",
                                           data['group_code'])
                            res = cursor.fetchone()
                            cursor.execute("UPDATE our_group set owner = %s WHERE group_code = %s",
                                           (res[0], data['group_code']))
                            cursor.connection.commit()
                    response = jsonify(result="member deleted")
            elif data['reason'] == "leave group":
                sql1 = "UPDATE user_class_group SET group_code = NULL WHERE username = %s and group_code = %s"
                val1 = (data['username'], data['group_code'])
                cursor.execute(sql1, val1)
                cursor.connection.commit()            
                sql2 = "UPDATE our_group SET current_group_size = current_group_size - 1 WHERE group_code = %s"
                val2 = (data['group_code'])
                cursor.execute(sql2, val2)  
                cursor.connection.commit()
                cursor.execute("SELECT current_group_size from our_group WHERE group_code = %s",data['group_code'])
                dbResult = cursor.fetchone()
                if dbResult and dbResult[0] == 0:
                    cursor.execute("DELETE FROM our_group WHERE group_code = %s", data['group_code'])
                    cursor.connection.commit()
                else:
                    #Check if leaver is owner
                    cursor.execute("SELECT owner from our_group WHERE group_code = %s", data['group_code'])
                    if username == cursor.fetchone()[0]:
                    #Owner is leaving, assign new owner
                        cursor.execute("SELECT username from user_class_group where group_code = %s", data['group_code'])
                        res = cursor.fetchone()
                        cursor.execute("UPDATE our_group set owner = %s WHERE group_code = %s", (res[0], data['group_code']))
                        cursor.connection.commit()

                response = jsonify(result="left group")
    cursor.close()

    corsFix(response.headers)

    return response

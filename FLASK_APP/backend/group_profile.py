from flask import request, jsonify
from flask_cors import cross_origin
import string
import random
from .home_login import check_token
from flask import Blueprint

group_profile = Blueprint('group_profile', __name__)


@group_profile.route("/group_profile", methods=['POST', 'GET', 'OPTIONS'])

def groupProfile():
    
    from .app import mysql
    cursor = mysql.connect().cursor()
    response = jsonify(result = "No token")

    #token = request.headers['Authorization']
    token = None
    for (key,val) in request.headers.items():
       if key == "Authorization":
         token = val
    username = ''
    if token:
        username = check_token(token)
        # print("python ---------------")

        if request.method == 'GET':
            
            if token:
                class_code = request.args.get("classcode")
                group_code= request.args.get("group_code")

                # print(class_code,group_code)

                section_id =''
                group_name =''
                desc=''
                members=[]
                # true = '1', false = '0'
                isProf = ''
                isInGroup =''

                # check the if the user is a prof 
                user_query ="""SELECT is_professor
                        FROM user
                        WHERE username = %s ;"""
                user=(username,)
                cursor.execute(user_query,user)
                dbUserisProf = cursor.fetchone()
                for user in dbUserisProf:
                    if user == False:
                        isProf = '0'
                        # print('student')
                        # check if the student is in the current group
                        ingroup_query ="""SELECT class_code
                                        FROM user_class_group
                                        WHERE username = %s AND group_code = %s;"""
                        ingroup_val = (username,group_code)
                        cursor.execute(ingroup_query,ingroup_val)
                        dbExist = cursor.fetchone()
                        # print(dbExist)
                        if dbExist== None:
                            isInGroup = '0'
                            # print('not exist')
                        else:
                            isInGroup ='1'
                    else:
                        isProf = '1'
                        isInGroup = '0'
                        # print('prof')

                # fetch info from the group
                group_query = """SELECT section_id, group_name, description
                        FROM our_group
                        WHERE group_code = %s AND class_code = %s;"""
                val = (group_code,class_code)
                cursor.execute(group_query, val)
                dbGroup = cursor.fetchall()

                for elem in dbGroup:
                    section_id=elem[0]
                    group_name=elem[1]
                    desc=elem[2]

                # fetch members info
                member_query = """SELECT username, email
                        FROM user
                        WHERE username =(
                            SELECT username 
                            FROM user_class_group
                            WHERE group_code = %s AND class_code = %s);"""
                cursor.execute(member_query, val)
                dbMember = cursor.fetchall()

                # put all members' info to the member list
                for mem in dbMember:
                    memDict = {
                        "username":mem[0],
                        "email":mem[1]
                    }
                    members.append(memDict)
                # print("result-----------")
                
                
                response = jsonify(result="200", section_id = section_id, group_name= group_name, desc = desc,
                                       membersList=members, username=username, isInGroup=isInGroup, isProf=isProf)
                # print(response)

            else:
                response = jsonify(result="not logged in")
        elif request.method == 'OPTIONS':
            response = jsonify(result="200")
        elif request.method == 'POST':
            data = request.get_json()
            if data['post_type'] == "edit description":
                group_code = data['group_code']
                new_desc = data['desc']
                desc_query = """UPDATE our_group
                            SET description = %s
                            WHERE group_code = %s;"""

                newdesc_val = (new_desc, group_code)
                cursor.execute(desc_query, newdesc_val)
                cursor.connection.commit()
                response = jsonify(result="desc updated", new_desc = new_desc)
            elif data['post_type'] == "leave group":
                sql1 = "UPDATE user_class_group SET group_code = NULL WHERE username = %s and group_code = %s"
                val1 = (data['username'], data['group_code'])
                cursor.execute(sql1, val1)
                sql2 = "UPDATE our_group SET current_group_size = current_group_size - 1 WHERE group_code = %s"
                val2 = (data['group_code'])
                cursor.execute(sql2, val2)
                cursor.execute("DELETE FROM our_group WHERE current_group_size = 0")
                cursor.connection.commit()
                response = jsonify(result="left group")
    cursor.close()

    from .app import corsFix
    corsFix(response.headers)



    return response
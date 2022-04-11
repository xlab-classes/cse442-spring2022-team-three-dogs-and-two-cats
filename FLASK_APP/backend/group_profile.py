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
        print("python ---------------")
        # print(username)

        if request.method == 'GET':
            
            if token:
                # print('yes')
                class_code = request.args.get("classcode")
                group_code= request.args.get("group_code")
                # data = request.get_json()
                # get class code
                # class_code = data['classcode'] 
                # group_code = data['group_code']
                print(class_code,group_code)

                section_id =''
                group_name =''
                desc=''
                members=[]

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
                print("result-----------")
                print(section_id, group_name,desc, members,username)
                
                response = jsonify(result="200", section_id = section_id, group_name= group_name, desc = desc,
                                       membersList=members, username=username)

            else:
                response = jsonify(result="not logged in")
        elif request.method == 'OPTIONS':
            response = jsonify(result="200")
        elif request.method == 'POST':
            response = jsonify(result="200")

    cursor.close()

    from .app import corsFix
    corsFix(response.headers)

    return response
from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import jwt
import datetime

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



reset_password = Blueprint('reset_password', __name__)


@reset_password.route("/reset_password", methods=['POST','GET', 'OPTIONS'])

def password():
    print(request.method)
    from .app import mysql, corsFix
    cursor = mysql.connect().cursor()


    if request.method == 'OPTIONS':
        response = jsonify(result="200")
        corsFix(response.headers)
      
        return response

    if request.method == 'GET':
        print("get")
        # #IDK why this line doesnt work, but it doesnt so I had to replace it with the for-loop
        # #token = request.headers['Authorizaton']
        # token = None
        # for (key,val) in request.headers.items():
        #    if key == "Authorization":
        #       token = val

        # print("get token",token)
        # if token and token != 'null':
        #     username = check_token(token)
        #     print(username)

        #     query = """ SELECT * from user WHERE username = %s """
        #     tuple1 = (username)
        #     cursor.execute(query,tuple1)
        #     check_prof = cursor.fetchone()
        #     print("query",check_prof)

        #     query_message = """SELECT COUNT(message_id) FROM message WHERE reciever_id = %s AND is_unread = %s"""
        #     message_tuple = (username, True)
        #     cursor.execute(query_message,message_tuple)
        #     cnt=cursor.fetchone()
        #     message_number = -1
        #     if cnt:
        #         message_number = cnt[0]
            
        #     if check_prof and check_prof[6] == 1:
        #         response = jsonify({'result':"Professor", 'username':username, 'message_number': message_number})
        #     else:
        #         response = jsonify({'result':"Student", 'username':username, 'message_number': message_number})
        # else:
        #     response = jsonify(result="not logged in")
        # print("get response", response.data)
        # corsFix(response.headers)
        # return response
        # print('Get request is', cookie)
        
        # return f" this is {cookie}"

    else:
        # print('Post request is',request.headers)
        data = request.get_json()
        email = data['email']
        print(email)
        response = jsonify({"result":"Email Send"})
        # password = data['password']
    

        # if username == '' or password == '':
        #     response = jsonify(result="username or password cannot be empty")

        # else:
            
        #     query = """ SELECT * from user WHERE username = %s """
        #     tuple1 = (username)
        #     cursor.execute(query,tuple1)
        #     check_username = cursor.fetchone()
        #     print(check_username)
            
        #     #check if this user is exist
        #     if check_username is None:
        #         print("Invalid username or password")
        #         response = jsonify({"result":"Invalid username or password"})

        #     else :
        #         #check if username and password are matched
        #         if compareUserHash(password, username):
        #             token = create_jwt(data['username'])
        #             print("here is token",token)
                    
        #         #comfirm if the user is a prof or student
        #             if check_username[6] == 1:
        #                 # response = jsonify({"result":"Professor", "username":username, "token":token})
        #                 response = make_response(jsonify({"result":"Professor", "username":username,"token":token}))

        #             else:
        #                 response = jsonify({"result":"Student", "username":username,"token":token})

        #             # response.set_cookie("name", token)
        #             print(response.headers)


        #         else:
        #             print("Invalid username or password")
        #             response = jsonify({"result":"Invalid username or password"})

                
        print(data) 

        cursor.close()

   

    corsFix(response.headers)
    
    return response
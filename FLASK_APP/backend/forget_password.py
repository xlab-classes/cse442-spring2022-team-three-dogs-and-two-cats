from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin

import jwt
import datetime

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *
from flask_mail import Mail,Message




reset_password = Blueprint('reset_password', __name__)


@reset_password.route("/reset_password", methods=['POST','GET', 'OPTIONS'])

def password():
    print(request.method)
    from .app import mysql, corsFix
    cursor = mysql.connect().cursor()

    from .app import mail


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
        response = jsonify({"result":"Email Send"})
        data = request.get_json()
        email = data['email']
        print(email)

        email_query = """SELECT * from user WHERE email = %s"""
        tuple_email = (email)
        cursor.execute(email_query,tuple_email)
        check_email = cursor.fetchone()   
        if check_email:
            new_password = ''.join(random.choice(
                                    string.ascii_letters) for i in range(8))

            hashed = toHash(new_password)
            reset_query = """UPDATE user
                        SET password = %s, salt=%s
                        WHERE email = %s ;"""
            reset_val = (digest(hashed[0]), hashed[1], email )
            cursor.execute(reset_query, reset_val)  
            cursor.connection.commit()

            msg = Message('Hello from the other side!', sender =   '3dogs.2cats.reset@gmail.com', recipients = [email])
            msg.body = "Here is the temporary password: "+ new_password +". If you want to reset password please login and change it in account setting."
            mail.send(msg)

            response = jsonify(result="account info updated", email=email, new_password=new_password)
        else:
            response = jsonify(result="email not exist")

        cursor.close()

      

   

    corsFix(response.headers)
    
    return response
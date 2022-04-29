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
            msg.body = "Here is your temporary password: "+ new_password +". You can now login with it!  If you want to reset your password then please login and change it in account setting."
            msg.html = "Here is your temporary password: <b> "+ new_password +".</b> You can now login with it! If you want to reset your password then please login and change it in account setting."

            mail.send(msg)

            response = jsonify(result="account info updated", email=email, new_password=new_password)
        else:
            response = jsonify(result="email not exist")

        cursor.close()

      

   

    corsFix(response.headers)
    
    return response
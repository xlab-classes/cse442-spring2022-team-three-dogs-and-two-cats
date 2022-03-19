from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import jwt
import datetime

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



home_login = Blueprint('home_login', __name__)

@home_login.route("/", methods=['POST','GET'])
# @cross_origin()
def login():
    print(request.method)
    if request.method == 'GET':
        cookie = request.cookies
        data = request.get_json()
        # print('Get request is', cookie)
        response = jsonify(result="hi")
        # return f" this is {cookie}"

    else:
        print('Post request is',request.headers)
        data = request.get_json()
        username = data['username']
        password = data['password']
    
        
        from .app import mysql
        cursor = mysql.connect().cursor()

        if username == '' or password == '':
            response = jsonify(result="username or password cannot be empty")

        else:
            
            query = """ SELECT * from user WHERE username = %s """
            tuple1 = (username)
            cursor.execute(query,tuple1)
            check_username = cursor.fetchone()
            print(check_username)
            
            #check if this user is exist
            if check_username is None:
                print("Invalid username or password")
                response = jsonify({"result":"Invalid username or password"})

            else :
                #check if username and password are matched
                if compareUserHash(password, username):
                    token = create_jwt(data['username'])
                    
                #comfirm if the user is a prof or student
                    if check_username[6] == 1:
                        # response = jsonify({"result":"Professor", "username":username, "token":token})
                        response = make_response(jsonify({"result":"Professor", "username":username,"token":token}))

                    else:
                        response = jsonify({"result":"Student", "username":username,"token":token})

                    response.set_cookie("name", token)
                    print(response.headers)


                else:
                    print("Invalid username or password")
                    response = jsonify({"result":"Invalid username or password"})

                
        print(data) 

        cursor.close()

   


    return response



private_key = "i'm a key"
def create_jwt(username):
    payload = {"iss":username, "iat":datetime.datetime.utcnow()}
    token = jwt.encode(payload, private_key, algorithm="HS256")
    return token
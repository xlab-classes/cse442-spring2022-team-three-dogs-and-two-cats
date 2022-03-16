from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



home_login = Blueprint('home_login', __name__)

@home_login.route("/", methods=['POST','GET'])
# @cross_origin()
def login():
    print("hi")
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

                #comfirm if the user is a prof or student
                if check_username[6] == 1:
                    response = jsonify({"result":"Professor", "username":username})

                else:
                    response = jsonify({"result":"Student", "username":username})
            else:
                print("Invalid username or password")
                response = jsonify({"result":"Invalid username or password"})

            
    print(data) 

    cursor.close()

   


    return response
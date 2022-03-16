from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin

from flask import Blueprint

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
        
        query = """ SELECT * from user WHERE username = %s AND password = %s """
        tuple1 = (username, password)
        cursor.execute(query,tuple1)
        check_data = cursor.fetchone()
        print(check_data)
        # userLength = cursor.fetchone()[0]
        
        # print(userLength)

        if check_data is None:
            print("Invalid username or password")
            response = jsonify({"result":"Invalid username or password"})

        else :
            if check_data[5] == 1:
                response = jsonify({"result":"Professor", "username":username})

            else:
                response = jsonify({"result":"Student", "username":username})
            
    print(data) 

    cursor.close()

   


    return response
from audioop import cross
import json
from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin
from jwt import PyJWT
import datetime
import string
import random
from .home_login import check_token

from flask import Blueprint
from .hash442 import *



home_instructor = Blueprint('home_instructor', __name__)


@home_instructor.route("/home_instructor", methods=['POST','GET', 'OPTIONS'])
@cross_origin(origin='*')

def home_inst():

    from .app import mysql
    cursor = mysql.connect().cursor()
    username = ''

    if request.method == 'GET':
        token = request.headers['Authorization']
        if token:
            username = check_token(token)
            #do something
            print()
        else:
            response = jsonify(result="not logged in")
        

    else:

        data = request.get_json()
        class_name = data['classname']
        class_size = data['classsize']
        
        if class_name == '':
            repsonse = jsonify(result = "Class name cannot be empty")
        else:
            if class_size == '':
             repsonse = jsonify(result = "Class size cannot be empty")
            else:
                #Generate new class code
                newClassCode = ''.join(random.choice(string.ascii_letters) for i in range (8))

                cursor.execute("SELECT * FROM class WHERE class_code = %s", newClassCode)
                result = cursor.fetchone()
                #Prevent duplicate class codes
                while result:
                    newClassCode = ''.join(random.choice(string.ascii_letters) for i in range (8))
                    cursor.execute("SELECT * FROM class WHERE class_code = %s", newClassCode)
                    result = cursor.fetchone()
                
                #Create new class in DB
                cursor.execute("INSERT INTO class VALUES (%s,%s,%s, %s, %s)", (newClassCode, class_name, "DemoProf", class_size, "0"))
                cursor.connection.commit()
                response = jsonify(result = "Class created", class_code = newClassCode)
    
    cursor.close()
    return response

            


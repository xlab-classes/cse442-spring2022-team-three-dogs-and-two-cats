from flask import request, jsonify
from flask_cors import cross_origin
import string
import random
from .home_login import check_token

from flask import Blueprint




home_instructor = Blueprint('home_instructor', __name__)


@home_instructor.route("/home_instructor", methods=['POST','GET', 'OPTIONS'])
@cross_origin(origin='*')

def home_inst():

   
    from .app import mysql
    cursor = mysql.connect().cursor()

    token = request.headers['Authorization']
    username = ''
    if token:
        username = check_token(token)

    match request.method:
        case 'GET':
            #do something
            if token:
              response = jsonify(result = "200")
            else:
              response = jsonify(result="not logged in")
        

   
        case 'OPTIONS':
            response = jsonify(result = "200")
        
        case 'POST':
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
                cursor.execute("INSERT INTO class VALUES (%s,%s,%s, %s, %s)", (newClassCode, class_name, username, class_size, "0"))
                cursor.connection.commit()
                response = jsonify(result = "Class created", class_code = newClassCode)
    print(data)
    cursor.close()
    return response

            


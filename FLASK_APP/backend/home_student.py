from flask import request, jsonify
from flask_cors import cross_origin
from .home_login import check_token
from flask import Blueprint
import json

home_student = Blueprint('home_student', __name__)

@home_student.route("/home_student", methods=['POST', 'GET', 'OPTIONS'])
@cross_origin(origin='*')

def homestudent():

    from .app import mysql
    cursor = mysql.connect().cursor()

    token = request.headers['Authorization']
    username = ''
    if token:
        username = check_token(token)
    
    match request.method:

        case 'GET':
            if token:
              response = jsonify(result = "200")
            else:
              response = jsonify(result="not logged in")

        case 'OPTIONS':
            response = jsonify(result = "200")
            response.headers.add('Access-Control-Allow-Origin', '*')

        case 'POST':
            data = request.get_json()
            class_code = data['class_code']

            #search table, find all classes that user is in
            codelst = []
            cursor.execute("SELECT class_code FROM user_class_group WHERE username = %s", username)
            for code in cursor.fetchall():
              codelst.append(code[0])
            #print(codelst)
            
            #get class name of all classes that user is in
            namelst = []
            for code in codelst:
              cursor.execute("SELECT class_name FROM class WHERE class_code = %s", code)
              namelst.append(cursor.fetchone()[0])
            #print(namelst)

            #create list of dictionaries to match each code with class name
            classeslst = []
            for i in range(len(codelst)):
              classeslst.append({"class_code": codelst[i], "class_name": namelst[i]})
            print(classeslst)

            response = jsonify(classeslst)

            
            #user join a new class entry
            #cursor.execute("INSERT INTO user_class_group (username, class_code) VALUES (%s, %s)", (username, class_code))
            #cursor.connection.commit()
            #response = jsonify(result = "Class joined")
    
    
    cursor.close()
    return response
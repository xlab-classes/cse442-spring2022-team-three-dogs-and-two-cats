from flask import request, jsonify
from flask_cors import cross_origin
from .home_login import check_token
from flask import Blueprint

home_student = Blueprint('home_student', __name__)

@home_student.route("/home_student", methods=['POST', 'GET'])
@cross_origin(origin='*')

def homestudent():

    from .app import mysql
    cursor = mysql.connect().cursor()

    token = request.headers['Authorization']
    username = ''
    if token:
        username = check_token(token)
    
    print(request.method)
    match request.method:
        case 'GET':
            if token:
              response = jsonify(result = "200")
            else:
              response = jsonify(result="not logged in")

        case 'POST':
            data = request.get_json()
            entity_id = data['entity_id']
            class_code = data['class_code']

            #create new entry in DB
            entity_id += 1
            cursor.execute("INSERT INTO user_class_group VALUES (%d, %s, %s)", (entity_id, username, class_code))
            cursor.connection.commit()
            response = jsonify(result = "Class joined")
    
    
    print(data)
    cursor.close()
    return response
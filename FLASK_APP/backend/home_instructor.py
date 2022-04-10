from flask import request, jsonify
from flask_cors import cross_origin
import string
import random
from .home_login import check_token
from flask import Blueprint

home_instructor = Blueprint('home_instructor', __name__)


@home_instructor.route("/home_instructor", methods=['POST', 'GET', 'OPTIONS'])

def home_inst():
    
    from .app import mysql
    cursor = mysql.connect().cursor()
    response = jsonify(result = "No token")

    #token = request.headers['Authorization']
    token = None
    for (key,val) in request.headers.items():
       if key == "Authorization":
         token = val
    username = ''
    if token:
        username = check_token(token)

        if request.method == 'GET':
            if token:
                # Get all classes belonging to professor
                cursor.execute(
                    "Select class_name, class_code, current_class_size from class where creator = %s", username)
                dbClasses = cursor.fetchall()

                classList = []

                if dbClasses:
                    # Insert data into dictionary, then append to list
                    for curClass in dbClasses:
                        curClassDict = {
                            "className": curClass[0],
                            "classCode": curClass[1],
                            "classSize": curClass[2]
                        }

                        classList.append(curClassDict)
                    response = jsonify(result="Classes found",
                                       listOut=classList, userOut=username)
                else:
                    response = jsonify(
                        result="No classes found", userOut=username)

            else:
                response = jsonify(result="not logged in")
        else:
            if request.method == 'OPTIONS':
                response = jsonify(result="200")
            else:
                if request.method == 'POST':
                    data = request.get_json()
                    class_name = data['classname']
                    class_size = data['classsize']

                    if class_name == '':
                        repsonse = jsonify(result="Class name cannot be empty")
                    else:
                        if class_size == '':
                            repsonse = jsonify(
                                result="Class size cannot be empty")
                        else:
                            # Generate new class code
                            newClassCode = ''.join(random.choice(
                                string.ascii_letters) for i in range(8))

                            cursor.execute(
                                "SELECT * FROM class WHERE class_code = %s", newClassCode)
                            result = cursor.fetchone()
                            # Prevent duplicate class codes
                            while result:
                                newClassCode = ''.join(random.choice(
                                    string.ascii_letters) for i in range(8))

                                cursor.execute(
                                    "SELECT * FROM class WHERE class_code = %s", newClassCode)
                                result = cursor.fetchone()

                                # Create new class in DB
                            cursor.execute("INSERT INTO class VALUES (%s,%s,%s, %s, %s)",
                                           (newClassCode, class_name, username, class_size, "0"))
                            cursor.connection.commit()
                            response = jsonify(result="Class created",
                                               class_code=newClassCode)


    cursor.close()

    from .app import corsFix
    corsFix(response.headers)

    return response

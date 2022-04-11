from flask import request, jsonify
from flask_cors import cross_origin
import string
import random
from .home_login import check_token
from flask import Blueprint

group_profile = Blueprint('group_profile', __name__)


@group_profile.route("/group_profile", methods=['POST', 'GET', 'OPTIONS'])

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

                data = request.get_json()
                # get class code
                class_code = data['classcode'] 
                group_code = data['group_code']

                # Get all classes belonging to professor
                cursor.execute(
                    "Select is_professor from user where username = %s", username)
                check_prof = cursor.fetchone()
                if check_prof =='1':
                    print('prof')

                else:
                    print('student')    

                # dbClasses = cursor.fetchall()

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
                    response = jsonify(result="Group found",
                                       listOut=classList, userOut=username)
                else:
                    response = jsonify(
                        result="No group found", userOut=username)

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
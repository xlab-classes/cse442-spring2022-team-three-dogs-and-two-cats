from flask import request, jsonify
from flask_cors import cross_origin
from .home_login import check_token
from flask import Blueprint

home_student = Blueprint('home_student', __name__)


@home_student.route("/home_student", methods=['POST', 'GET', 'OPTIONS'])
#@cross_origin(origin='*')
def homestudent():

    from .app import mysql
    cursor = mysql.connect().cursor()
    
    #token = request.headers['Authorization']
    token = None
    for (key,val) in request.headers.items():
      if key == 'Authorization':
         token = val
    username = ''
    if token:
        username = check_token(token)

    if request.method == 'GET':
        if token:
            response = jsonify(result="200")
        else:
            response = jsonify(result="not logged in")

    elif request.method == 'OPTIONS':
        response = jsonify(result="200")
      

    elif request.method == 'POST':
        data = request.get_json()
        class_code = data['class_code']

        # search table, find all classes that user is in
        codelst = []
        cursor.execute(
            "SELECT class_code FROM user_class_group WHERE username = %s", username)
        for code in cursor.fetchall():
            codelst.append(code[0])
        # print(codelst)

        # get class name of all classes that user is in
        namelst = []
        for code in codelst:
            cursor.execute(
                "SELECT class_name FROM class WHERE class_code = %s", code)
            namelst.append(cursor.fetchone()[0])
        # print(namelst)

        # search table, find all group code of user
        grouplst = []
        cursor.execute("SELECT group_code FROM user_class_group WHERE username = %s", username)
        for code in cursor.fetchall():
            grouplst.append(code[0])

        # create list of dictionaries to match each code with class name
        classeslst = []
        for i in range(len(codelst)):
            classeslst.append(
                {"class_code": codelst[i], "class_name": namelst[i], "group_code": grouplst[i]})
        # print(classeslst)

        if len(class_code) == 0:  # class_code not entered
            # return list of user's classes
            response = jsonify(classeslst=classeslst, username=username)

        # if user entered class code that is already displayed
        elif len(class_code) != 0:  # class_code entered
            check = False
            for dict in classeslst:
                if dict["class_code"] == class_code:
                    check = True
                    response = jsonify(result="CLASS ALREADY JOINED")

            # if user entered class code that is not already displayed
            if check == False:
                allClasses = []
                cursor.execute("SELECT class_code FROM class")
                for code in cursor.fetchall():
                    allClasses.append(code[0])

                check2 = False
                for code in allClasses:
                    if class_code == code:
                        check2 = True
                # invalid code
                if check2 == False:
                    response = jsonify(result="INVALID CODE")
                # valid code
                elif check2 == True:
                    response = jsonify(result="VALID CODE, CLASS JOINED")
                    # user join a new class entry
                    cursor.execute(
                        "INSERT INTO user_class_group (username, class_code) VALUES (%s, %s)", (username, class_code))
                    cursor.connection.commit()


    cursor.close()
    
    from .app import corsFix
    corsFix(response.headers)

    return response

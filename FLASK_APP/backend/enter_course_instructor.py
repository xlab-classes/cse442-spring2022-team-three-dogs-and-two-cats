from flask import Flask, request, jsonify, make_response
from flask import Blueprint

enter_course_instructor = Blueprint('enter_course_instructor', __name__)

@enter_course_instructor.route("/enter_course_instructor", methods=['POST', 'GET', 'OPTIONS'])
def create_new_group():
    from .app import mysql, corsFix
    cursor = mysql.connect().cursor()
    if request.method == 'OPTIONS':
        response = jsonify(result="200")
        corsFix(response.headers)
        response.status = 200
        return response

    if request.method == 'GET':
        class_code = request.args.get("classCode")
        print("(instructor) opt_param is", class_code)
        query = """ SELECT * from our_group WHERE class_code = %s"""
        tuple1 = class_code
        cursor.execute(query, tuple1)
        response_list = []
        myresult = list(cursor.fetchall())
        for x in myresult:
            response_dic = {'groupCode': x[0], 'classCode': x[1], 'sectionNumber': x[2], 'owner': x[3],
                            'groupSize': x[4], 'currentSize': x[5], 'isPublic': x[6], 'description': x[7],
                            'groupName': x[8]}
            response_list.append(response_dic)
        response = jsonify(response_list)
        corsFix(response.headers)
        response.status = 200
        return response
    else:
        data = request.get_json()

        sql2 = "UPDATE user_class_group SET group_code = NULL WHERE group_code = %s"
        val2 = (data['group_code'])
        cursor.execute(sql2, val2)

        sql1 = "DELETE FROM our_group WHERE group_code = %s"
        val1 = (data['group_code'])
        cursor.execute(sql1, val1)

        cursor.connection.commit()

        sql3 = "SELECT * from our_group where class_code = %s"
        val3 = (data['class_code'])
        cursor.execute(sql3, val3)
        response_list = []
        myresult = list(cursor.fetchall())
        for x in myresult:
            response_dic = {'groupCode': x[0], 'classCode': x[1], 'sectionNumber': x[2], 'owner': x[3],
                            'groupSize': x[4], 'currentSize': x[5], 'isPublic': x[6], 'description': x[7],
                            'groupName': x[8]}
            response_list.append(response_dic)
        response = jsonify(response_list)
        corsFix(response.headers)
        response.status = 200
        return response

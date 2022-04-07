from flask import Flask, request, jsonify, make_response
from flask import Blueprint
from flask_cors import cross_origin

enter_course_instructor = Blueprint('enter_course_instructor', __name__)

@cross_origin(origin='*')
@enter_course_instructor.route("/enter_course_instructor", methods=['POST', 'GET'])
def create_new_group():
    from .app import mysql
    cursor = mysql.connect().cursor()
    if request.method == 'OPTIONS':
        response = jsonify(result="200")
        response.headers.add('Access-Control-Allow-Origin', '*')

    if request.method == 'GET':
        class_code = request.args.get("classCode")
        print("(instructor) opt_param is", class_code)
        query = """ SELECT * from our_group WHERE class_code = %s"""
        tuple1 = class_code
        cursor.execute(query, tuple1)
        response_list = []
        myresult = list(cursor.fetchall())
        for x in myresult:
            response_dic = {}
            response_dic['groupCode'] = x[0]
            response_dic['classCode'] = x[1]
            response_dic['sectionNumber'] = x[2]
            response_dic['owner'] = x[3]
            response_dic['groupSize'] = x[4]
            response_dic['currentSize'] = x[5]
            response_dic['isPublic'] = x[6]
            response_dic['description'] = x[7]
            response_dic['groupName'] = x[8]
            response_list.append(response_dic)
        response = jsonify(response_list)
        return response
    """
    else:
        data = request.get_json()
        owner = data['name']
        section = data['section']
        group_name = data['groupName']
        max_group_size = data['groupSize']
        current_group_size = 1
        ifpublic = data['isPublic']
        class_code = data['classCode']

        sql_insert_our_group = "INSERT INTO our_group (class_code,section_id,owner,max_group_size,current_group_size,is_public, description,group_name) VALUES ( %s, %s, %s, %s, %s,%s,%s,%s) "
        val = (class_code, section, owner, max_group_size, current_group_size, ifpublic, "No description", group_name)
        cursor.execute(sql_insert_our_group, val)

        query_group_code = " SELECT MAX(group_code) As max From our_group "
        cursor.execute(query_group_code)
        group_code = cursor.fetchone()[0]

        # print("max group_code is ",group_code)

        sql_update_group_code = "UPDATE user_class_group SET group_code = %s WHERE username = %s AND class_code = %s"
        val = (group_code, owner, class_code)
        cursor.execute(sql_update_group_code, val)

        query = " SELECT * from our_group WHERE class_code = %s"
        tuple1 = class_code
        cursor.execute(query, tuple1)
        myresult = list(cursor.fetchall())
        for x in myresult:
            print(x)

        query = " SELECT * From user_class_group"
        tuple1 = class_code
        cursor.execute(query)
        myresult = list(cursor.fetchall())

        for x in myresult:
            print(x)

        cursor.connection.commit()
        response = jsonify({"group_code": group_code, "currentSize": current_group_size})
        print(data)
        return response
    """
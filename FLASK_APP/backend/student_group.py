# from xxlimited import Null
from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin

import uuid

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



student_group = Blueprint('student_group', __name__)
class_code = '123abc'

# @cross_origin()
@student_group.route("/enter_course_student", methods=['POST','GET'])
def create_new_group():
    from .app import mysql
    cursor = mysql.connect().cursor()
    if request.method == 'GET':
        print("i am get")
        query = """ SELECT * from our_group WHERE class_code = %s"""
        tuple1 = class_code
        cursor.execute(query,tuple1)
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
            print("response_list",response_list)
        response = jsonify(response_list)
        return response



    else:
        data = request.get_json()
        owner = data['name']
        section = data['section']
        group_name = data['groupName']
        max_group_size = data['groupSize']
        current_group_size = int(max_group_size) - 1
        ifpublic = data['isPublic']
       
       
        sql_insert_our_group = "INSERT INTO our_group (class_code,section_id,owner,max_group_size,current_group_size,is_public, description,group_name) VALUES ( %s, %s, %s, %s, %s,%s,%s,%s) "
        val = ( class_code, section ,owner, max_group_size,current_group_size,ifpublic,"No description",group_name)
        cursor.execute(sql_insert_our_group, val)

        query_group_code = """ SELECT MAX(group_code) As max From our_group """
        cursor.execute(query_group_code)
        group_code = cursor.fetchone()[0]
     

        print("max group_code is ",group_code)

        sql_insert_user_class_group= "INSERT INTO user_class_group (username,class_code,group_code) VALUES (%s, %s, %s) "
        val = ( owner, class_code, group_code)
        cursor.execute(sql_insert_user_class_group, val)


        # query = """ SELECT * from our_group WHERE class_code = %s"""
        # tuple1 = class_code
        # cursor.execute(query,tuple1)
        # myresult = list(cursor.fetchall())
        # for x in myresult:
        #     print(x)

        # query = """ SELECT * From user_class_group"""
        # tuple1 = class_code
        # cursor.execute(query)
        # myresult = list(cursor.fetchall())
        
        # for x in myresult:
        #     print(x)


        cursor.connection.commit()
        response = jsonify({"class_code":class_code}) 
        print(data)
        return response

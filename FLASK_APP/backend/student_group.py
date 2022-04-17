# from xxlimited import Null
# from tkinter import NO
# from xxlimited import Null
from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin

import uuid

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



student_group = Blueprint('student_group', __name__)
# class_code = ''

@student_group.route("/enter_course_student", methods=['POST','GET', 'OPTIONS'])
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
        print("opt_param is",class_code)
        
        
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
            # print('isPublic',x[6])

        query = """ SELECT class_name from class WHERE class_code = %s"""
        tuple2 = class_code
        cursor.execute(query,tuple2)
        class_name = cursor.fetchone()

        response = jsonify({"response_list":response_list,"className":class_name})
        corsFix(response.headers)
        return response



    else:
        data = request.get_json()
        owner = data['name']
        section = data['section']
        group_name = data['groupName']
        max_group_size = data['groupSize']
        current_group_size = 1
        ifpublic = data['isPublic']
        # print("ifpublic",ifpublic)
        class_code = data['classCode']
        print("data------------------------------",data)


        response = {}
        if section == ''  or group_name == '' or max_group_size == '':
            if section == '':
                print("data------------------------------",data)
                response['section_result'] = "section cannot be empty"

            if group_name == '':
                response['group_name_result'] = "group name cannot be empty"
            
            if max_group_size == 0:
                response['group_size_result'] = "group size cannot be empty"     
            return response


        else:
            sql_check_group_code = "SELECT * from user_class_group WHERE username = %s AND class_code = %s"

            val = (owner,class_code)
            cursor.execute(sql_check_group_code, val)   
            check_group_code = cursor.fetchone()
            row_count = cursor.rowcount
            print("==========================fechall",row_count)
            print("==========================fechall",check_group_code)

            if check_group_code[3] is None:
                sql_insert_our_group = "INSERT INTO our_group (class_code,section_id,owner,max_group_size,current_group_size,is_public, description,group_name) VALUES ( %s, %s, %s, %s, %s,%s,%s,%s) "
                val = ( class_code, section ,owner, max_group_size,current_group_size,ifpublic,"No description",group_name)
                cursor.execute(sql_insert_our_group, val)

                query_group_code = """ SELECT MAX(group_code) As max From our_group """
                cursor.execute(query_group_code)
                group_code = cursor.fetchone()[0]
            

                # print("max group_code is ",group_code)

                sql_update_group_code = "UPDATE user_class_group SET group_code = %s WHERE username = %s AND class_code = %s"
                val = (group_code, owner,class_code)
                cursor.execute(sql_update_group_code, val)  
                response = jsonify({'result':'pass',"group_code":group_code,"currentSize":current_group_size}) 
                

            else:
                response = jsonify({'result':'you already in a group'}) 





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
            
            
        corsFix(response.headers)
        return response
        
        
   
  

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
        name = request.args.get("name")
        print("opt_param is",class_code)
        print("name is ", name)
        
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

        query_group_code = "SELECT * FROM user_class_group WHERE username = %s AND class_code = %s"
        val = (name,class_code)
        cursor.execute(query_group_code, val)  
        class_group = cursor.fetchone()
        group_code = -1
        if class_group is not None and class_group[3]is not None:
            group_code = class_group[3]
    
        response = jsonify({"response_list":response_list,"className":class_name,"group_code":group_code})
        corsFix(response.headers)
        return response



    elif request.method == 'POST':
        data = request.get_json()

        if data['reason'] == "create":
            owner = data['name']
            section = data['section']
            group_name = data['groupName']
            max_group_size = data['groupSize']
            current_group_size = 1
            ifpublic = data['isPublic']
            # print("ifpublic",ifpublic)
            class_code = data['classCode']
            #print("data------------------------------",data)


            response = {}
            if section == ''  or group_name == '' or max_group_size == '':
                if section == '':
                    #print("data------------------------------",data)
                    response['section_result'] = "section cannot be empty"

                if group_name == '':
                    response['group_name_result'] = "group name cannot be empty"
            
                if max_group_size == '':
                    response['group_size_result'] = "group size cannot be empty"     
                return response


            else:
                sql_check_group_code = "SELECT * from user_class_group WHERE username = %s AND class_code = %s"

                val = (owner,class_code)
                cursor.execute(sql_check_group_code, val)   
                check_group_code = cursor.fetchone()
                row_count = cursor.rowcount
            #print("==========================fechall",row_count)
            #print("==========================fechall",check_group_code)

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
            cursor.connection.commit()

        elif data['reason'] == "request":
                groupCode = data['groupCode']
                msg = data['message']
                username = data['name']
                

                #Get group owner username, group name, class code, group size
                cursor.execute("SELECT owner, group_name, class_code, current_group_size, max_group_size from our_group WHERE group_code = %s", groupCode)
                dbResult = cursor.fetchone()
                toUser = dbResult[0]
                group_name = dbResult[1]
                class_code = dbResult[2]

                
                #validate group is not full
                if dbResult[3] == dbResult[4]:
                    response = jsonify(result = -5)
                    corsFix(response.headers)
                    return response

              

                #validate no pending request
                cursor.execute("SELECT message_id from message WHERE reciever_id = %s AND sender_id = %s AND group_code = %s", (toUser, username, groupCode))
                if cursor.fetchone():
                    response = jsonify(result = -4)
                    corsFix(response.headers)
                    return response

                cursor.execute("SELECT class_name from class where class_code = %s", class_code)
                dbResult = cursor.fetchone()
                class_name = dbResult[0]

                if msg == "":
                    msg = username + " has requested to join group " + group_name + " in class " + class_name + "."

                #Insert message into the database
                msgTuple = (username, toUser, msg, '1', '1', groupCode, '1')
                cursor.execute("INSERT INTO message (sender_id, reciever_id, content, is_unread, is_invite, group_code, is_request) values (%s, %s , %s, %s, %s, %s, %s)", msgTuple)
                cursor.connection.commit()

                response = jsonify(result = "200")   




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


            
            
            
        corsFix(response.headers)
        return response
        
        
   
  

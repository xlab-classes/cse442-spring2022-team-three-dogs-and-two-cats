from tokenize import group
from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import jwt
import datetime

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *
from .home_login import check_token


message = Blueprint('message', __name__)


@message.route("/message", methods=['POST','GET', 'OPTIONS'])

def login():
    from .app import mysql, corsFix
    cursor = mysql.connect().cursor()

    #token = request.headers['Authorization']
    response = jsonify(result = 404)
    token = None
    for (key,val) in request.headers.items():
       if key == "Authorization":
         token = val
    username = ''
    if token:
        username = check_token(token)

        if request.method == 'GET':
            data = request.query_string.decode()

            #Get unread message count for dropdown
            if data == "reason=count":

                cursor.execute("SELECT COUNT(message_id) FROM message where reciever_id = %s AND is_unread = %s", (username, '1'))
                dbResult = cursor.fetchone()
                #Null check
                if dbResult:
                    msgCount = dbResult[0]
                    response = jsonify(count = msgCount)
                    
                else:
                    reseponse = jsonify(count = '-1')
            
            #Get all messages for user    
            else:
                cursor.execute("SELECT * from message WHERE reciever_id = %s AND is_unread = '1' ORDER BY creation_date DESC", username )
                dbResult = cursor.fetchall()
                unreadList = []
                readList = []
                status= ''

                #Get unread messages, sorted by latest first
                if dbResult:

                    for res in dbResult:
                        currDict = {
                            "message_id" : res[0],
                            "sender_id": res[1],
                            "reciever_id": res[2],
                            "content" : res[3],
                            "is_unread" : res[4],
                            "is_invite" : res[5],
                            "creation_date" : res[6]  
                        }
                        unreadList.append(currDict)
                else:
                    status += "No unread messages found. "

                cursor.execute("SELECT * from message WHERE reciever_id = %s AND is_unread = '0' ORDER BY creation_date DESC", username )
                dbResult = cursor.fetchall()  

                #Get read messages, sorted by latest first
                if dbResult:

                    for res in dbResult:
                        currDict = {
                            "message_id" : res[0],
                            "sender_id": res[1],
                            "reciever_id": res[2],
                            "content" : res[3],
                            "is_unread" : res[4],
                            "is_invite" : res[5],
                            "creation_date" : res[6]  
                        }
                        readList.append(currDict)
                else:
                    status += "No read messages found."

                if status == '' :
                    status = "Both read and unread messages found"

                response = jsonify(result = status, unreadList = unreadList, readList = readList)   

        elif request.method == 'OPTIONS':
            response = jsonify(result = 200)
        elif request.method == 'POST':
            data = request.get_json()

            #Invite accepted
            if data['reason'] == "accept":
                messageId = data['message_id']
                #Get group code of group user was invited to
                cursor.execute("SELECT group_code, sender_id, is_request FROM message where message_id = %s", messageId )
                dbResult = cursor.fetchone()

                if dbResult:
                    groupCode = dbResult[0]
                    sender_id = dbResult[1]
                    isRequest = dbResult[2]

                      #Delete invite from message
                    cursor.execute("DELETE FROM message WHERE message_id = %s", messageId)
                    cursor.connection.commit()

                    #Verify group isnt already full
                    cursor.execute("SELECT current_group_size, max_group_size, class_code FROM our_group WHERE group_code = %s", groupCode)
                    dbResult = cursor.fetchone()
                    if dbResult[0] == dbResult[1]:
                       response = jsonify(result = -1)
                       corsFix(response.headers)
                       return response

                    classCode = dbResult[2]
                  

                    #You must be in a class to request to join, so we can skip below code for requests
                    if isRequest == 1:
                           #Validate requester is not in group
                        cursor.execute("SELECT group_code FROM user_class_group WHERE username = %s AND class_code = %s", (sender_id, classCode))
                        if cursor.fetchone()[0] is not None:
                            response = jsonify(result = -2)
                            corsFix(response.headers)
                            return response
                        
                        cursor.execute("UPDATE user_class_group SET group_code = %s WHERE username = %s AND class_code = %s", (groupCode, sender_id, classCode))
                        cursor.connection.commit()
                        
                        #Increase group count
                        cursor.execute("UPDATE our_group set current_group_size = current_group_size +1 WHERE group_code = %s", groupCode)
                        cursor.connection.commit()
                        
                        msg = username + " has accepted your request to join the group!"
                        accTuple = ('Admin', sender_id, msg, '1', '0')
                        cursor.execute("INSERT INTO message (sender_id, reciever_id, content, is_unread, is_invite) values (%s,%s,%s,%s,%s)", accTuple)
                        cursor.connection.commit()
                        response = jsonify(result = 201)

                    else:    

                       #Determine if user is already in the class or not
                        cursor.execute("SELECT * FROM user_class_group WHERE username = %s AND class_code = %s", (username, classCode))
                        dbResult = cursor.fetchone()

                        if dbResult:
                            #User is already in class, just add to group.
                            cursor.execute("UPDATE user_class_group SET group_code = %s WHERE username = %s AND class_code = %s", (groupCode, username, classCode))
                            cursor.connection.commit()
                        
                            #Increase group count
                            cursor.execute("UPDATE our_group set current_group_size = current_group_size +1 WHERE group_code = %s", groupCode)
                            cursor.connection.commit()
                        else:
                             #User has not joined class, add to both    
                            cursor.execute("INSERT INTO user_class_group (username, class_code, group_code) values (%s,%s, %s)", (username, classCode, groupCode))
                            cursor.connection.commit()
                            #Increase group and class count
                            cursor.execute("UPDATE our_group set current_group_size = current_group_size +1 WHERE group_code = %s", groupCode)
                            cursor.connection.commit()
                            cursor.execute("UPDATE class set current_class_size = current_class_size +1 WHERE class_code = %s", classCode)
                            cursor.connection.commit()

                        #Notify inviter that the invite was accepted
                        msg = username + " has accepted your invitation to join the group!"
                        accTuple = ('Admin', sender_id, msg, '1', '0')
                        cursor.execute("INSERT INTO message (sender_id, reciever_id, content, is_unread, is_invite) values (%s,%s,%s,%s,%s)", accTuple)
                        cursor.connection.commit()
                        response = jsonify(result = 200)
                else:
                    response = jsonify(result = 404)
           
            elif data['reason'] == "decline" :
                messageId = data['message_id']

                #Delete invite from message
                cursor.execute("DELETE FROM message WHERE message_id = %s", messageId)
                cursor.connection.commit()
                response = jsonify(result = 200)

            #Mark given message as read
            elif data['reason'] == "read":
                messageId = data['message_id']
                cursor.execute("UPDATE message SET is_unread = '0' WHERE message_id = %s", messageId)
                cursor.connection.commit()
                response = jsonify(result = 200)

    else:
        response = jsonify(result = "Not logged in")

    cursor.close()
    corsFix(response.headers)   
    return response 



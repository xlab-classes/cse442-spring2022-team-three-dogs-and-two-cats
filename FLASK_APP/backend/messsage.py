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
                    print("COUNT = " + str(msgCount))
                    response = jsonify(count = msgCount)
                    
                else:
                    reseponse = jsonify(count = '-1')
            #Get all messages for user    
            else:
                cursor.execute("SELECT * from message WHERE reciever_id = %s AND is_unread = '1' SORT BY creation_date ORDER BY DESC", username )
                dbResult = cursor.fetchall()
                unreadList, readList = []
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

                cursor.execute("SELECT * from message WHERE reciever_id = %s AND is_unread = '0' SORT BY creation_date ORDER BY DESC", username )
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
            if data['reason'] == "Accept":
                cursor.execute("SELECT * from message WHERE reciever_id = %s", username)
                dbResult = cursor.fetchall()

                if dbResult:
                    print()

    else:
        response = jsonify(result = "Not logged in")

    cursor.close()
    corsFix(response.headers)   
    return response 



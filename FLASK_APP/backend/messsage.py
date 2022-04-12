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
                print()
        elif request.method == 'OPTIONS':
            response = jsonify(result = 200)
    else:
        response = jsonify(result = "Not logged in")

    cursor.close()
    corsFix(response.headers)   
    return response 



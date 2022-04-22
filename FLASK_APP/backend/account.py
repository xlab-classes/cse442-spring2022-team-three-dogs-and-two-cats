from unittest import result
from flask import request, jsonify
from flask_cors import cross_origin
import string   
from .home_login import check_token
from flask import Blueprint
import re
from .hash442 import *

account = Blueprint('account', __name__)

@account.route("/account", methods=['POST', 'GET', 'OPTIONS'])

def accountPage():
    from .app import mysql, corsFix
    cursor = mysql.connect().cursor()
    response = jsonify(result="No token")

    # token = request.headers['Authorization']
    token = None
    for (key, val) in request.headers.items():
        if key == "Authorization":
            token = val
    username = ''
    if token:
        username = check_token(token)
        # print("python ---------------")
        if request.method == 'GET':
            
            if token:
                # print(username)
                first_name =''
                last_name =''
                email=''
                password=''
                user_query ="""SELECT first_name, last_name, email, password
                        FROM user
                        WHERE username = %s ;"""
                user=(username,)
                cursor.execute(user_query,user)
                dbUser = cursor.fetchone()
                # print(dbUser)
                first_name=dbUser[0]
                last_name=dbUser[1]
                email=dbUser[2]
                password=dbUser[3]
                response = jsonify(result="200", first_name = first_name, last_name= last_name, email = email,
                                       password=password, username=username)
            else:
                response = jsonify(result="not logged in")
        elif request.method == 'OPTIONS':
            response = jsonify(result="200")
        elif request.method == 'POST':
            
            data = request.get_json()
            regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            username = data['username']
            new_first_name = data['first_name']
            new_last_name = data['last_name']
            new_email = data['email']
            new_password = data['password']
            new_password2 = data['password2']

            if not re.fullmatch(regex, new_email):
                return jsonify(result="email")
            elif new_first_name.strip().replace(" ", "") == "":
                return jsonify(result="firstname")
            elif new_last_name.strip().replace(" ", "") == "":
                return jsonify(result="lastname")
            elif new_password == "":
                return jsonify(result="password")
            elif new_password2 == "":
                return jsonify(result="password2")
            elif new_password != new_password2:
                return jsonify(result="passwords do not match")
            else:
                # check if the email is already in used
                conn1 = mysql.connect()
                checkemails = conn1.cursor()
                checkemails.execute("SELECT email FROM user")
                emails = checkemails.fetchall()
                for x in emails:
                    if data['email'].lower() == x[0].lower():
                        print("Email is already in use.")
                        return "Enter new email"

                # update new information
                hashed = toHash(new_password)
                account_query = """UPDATE user
                            SET first_name = %s, last_name = %s, email = %s, password = %s, salt=%s
                            WHERE username = %s ;"""
                newaccount_val = (new_first_name, new_last_name, new_email,digest(hashed[0]), hashed[1], username )
                cursor.execute(account_query, newaccount_val)  
                cursor.connection.commit()
                response = jsonify(result="account info updated", new_first_name = new_first_name, new_last_name=new_last_name, new_email=new_email, new_password=new_password)
                return response

    cursor.close()

    corsFix(response.headers)

    return response
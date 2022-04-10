from flask import Flask, request, jsonify, render_template
from flask import Blueprint
from flask_cors import CORS
from flaskext.mysql import MySQL
from .hash442 import *
from flask_cors import cross_origin
from .app import corsFix
import re


sign_up = Blueprint('sign_up', __name__)
su = Flask(__name__)
mysql = MySQL()
su.config['MYSQL_DATABASE_HOST'] = 'oceanus.cse.buffalo.edu'
su.config['MYSQL_DATABASE_USER'] = 'dcao3'
su.config['MYSQL_DATABASE_PASSWORD'] = '50266687'
su.config['MYSQL_DATABASE_DB'] = 'cse442_2022_spring_team_n_db'
mysql.init_app(su)


@sign_up.route("/sign_up", methods=['POST', 'GET', 'OPTIONS'])

def signup():
    if request.method == 'OPTIONS':
        response = jsonify(result="200")
        corsFix(response)
        return response
        

    data = request.get_json()
    print(data)
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if not re.fullmatch(regex, data['email']):
        return jsonify(result="email")
    elif data['username'].strip().replace(" ", "") == "":
        return jsonify(result="username")
    elif data['firstname'].strip().replace(" ", "") == "":
        return jsonify(result="firstname")
    elif data['lastname'].strip().replace(" ", "") == "":
        return jsonify(result="lastname")
    elif data['password'] == "":
        return jsonify(result="password")
    elif data['password'] != data['password2']:
        return jsonify(result="password2")
    elif data['professor'] is False and data['student'] is False:
        return jsonify(result="account")
    else:
        conn1 = mysql.connect()
        checkusernames = conn1.cursor()
        conn2 = mysql.connect()
        checkemails = conn2.cursor()
        checkusernames.execute("SELECT username FROM user")
        usernames = checkusernames.fetchall()
        checkemails.execute("SELECT email FROM user")
        emails = checkemails.fetchall()
        for i in usernames:
            if data['username'].lower() == i[0].lower():
                print("Username is already in use. Please enter a different username")
                return "Enter new username"
        for x in emails:
            if data['email'].lower() == x[0].lower():
                print("Email is already in use. Did you mean to log in?")
                return "Enter new email or log in"
        conn3 = mysql.connect()
        cursor = conn3.cursor()
        hashed = toHash(data['password'])
        if data['professor'] is True:
            sql = "INSERT INTO user (username, password, salt, first_name, last_name, email, is_professor) VALUES (%s, %s, %s, %s, %s, %s, %s) "
            val = (
            data['username'], digest(hashed[0]), hashed[1], data['firstname'], data['lastname'], data['email'], '1')
            cursor.execute(sql, val)
            conn3.commit()
            response = jsonify(result="Professor")
            corsFix(response)
            return response
        else:
            sql = "INSERT INTO user (username, password, salt, first_name, last_name, email, is_professor) VALUES (%s, %s, %s, %s, %s, %s, %s) "
            val = (
            data['username'], digest(hashed[0]), hashed[1], data['firstname'], data['lastname'], data['email'], '0')
            cursor.execute(sql, val)
            conn3.commit()
            response = jsonify(result="Student")
            corsFix(response)
            return response
    return "Something went wrong"

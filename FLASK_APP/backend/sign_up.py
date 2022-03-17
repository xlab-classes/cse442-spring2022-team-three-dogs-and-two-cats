from flask import Flask, request, jsonify, render_template
from flask import Blueprint
from flask_cors import CORS
from flaskext.mysql import MySQL
from .hash442 import *

sign_up = Blueprint('sign_up', __name__)
su = Flask(__name__)
mysql = MySQL()
su.config['MYSQL_DATABASE_HOST'] = 'oceanus.cse.buffalo.edu'
su.config['MYSQL_DATABASE_USER'] = 'dcao3'
su.config['MYSQL_DATABASE_PASSWORD'] = '50266687'
su.config['MYSQL_DATABASE_DB'] = 'cse442_2022_spring_team_n_db'
mysql.init_app(su)


@sign_up.route("/sign_up", methods=['POST', 'GET'])
# @cross_origin()
def signup():
    data = request.get_json()
    print(data)
    if data['email'] == "":
        print("Please input your email")
    elif data['username'] == "":
        print("Please input a username")
    elif data['firstname'] == "":
        print("Please input your first name")
    elif data['lastname'] == "":
        print("Please input your last name")
    elif data['password'] == "":
        print("Please input a password")
    elif data['password'] != data['password2']:
        print("Passwords do not match")
    elif data['professor'] is False and data['student'] is False:
        print("Please select an instructors account or a students account")
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
            val = (data['username'], digest(hashed[0]), hashed[1], data['firstname'], data['lastname'], data['email'], '1')
            cursor.execute(sql, val)
            conn3.commit()
            response = jsonify(result="Professor")
            return response
        else:
            sql = "INSERT INTO user (username, password, salt, first_name, last_name, email, is_professor) VALUES (%s, %s, %s, %s, %s, %s, %s) "
            val = (data['username'], digest(hashed[0]), hashed[1], data['firstname'], data['lastname'], data['email'], '0')
            cursor.execute(sql, val)
            conn3.commit()
            response = jsonify(result="Student")
            return response
    return "Something went wrong"
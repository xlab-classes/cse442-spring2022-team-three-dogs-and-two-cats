from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin

from flask import Blueprint

home_login = Blueprint('home_login', __name__)
@home_login.route("/", methods=['POST'])

# @cross_origin()
def login():
    print("hi")
    data = request.get_json()
    response = jsonify(result="Student")
    # response.headers.add("Access-Control-Allow-Origin", "*")
    print(data)
    
    
    from .app import mysql
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from user WHERE username = 'DemoStudent'")
    print(cursor.fetchone())
    cursor.close()

   
    return response
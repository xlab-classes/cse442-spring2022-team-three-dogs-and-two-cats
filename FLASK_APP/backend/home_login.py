from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin
from flask import Blueprint


home_login = Blueprint('home_login', __name__)
@home_login.route("/", methods=['POST','GET'])
# @cross_origin()
def login():
    print("hi")
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username == '' or password == '':
        response = jsonify(result="username or password cannot be empty")
    else:
        response = jsonify(result="Student")
    # response.headers.add("Access-Control-Allow-Origin", "*")
    print(data)
    return response
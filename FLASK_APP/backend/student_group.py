from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin
import jwt
import datetime

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



student_group = Blueprint('student_group', __name__)

@cross_origin()
@student_group.route("/enter_course_student", methods=['POST','GET'])
def create_new_group():
    from .app import mysql
    cursor = mysql.connect().cursor()
    data = request.get_json()
    print(data)
    response = jsonify(result="not logged in")
    return response

from flask import Flask,request, jsonify, make_response
from flask_cors import CORS, cross_origin

from flask import Blueprint
# from FLASK_APP import  hash442
from .hash442 import *



instructor_class = Blueprint('instructor_class', __name__)


@instructor_class.route("/home_instructor", methods=['POST','GET'])
def create_new_class():
    from .app import mysql
    cursor = mysql.connect().cursor()
    data = request.get_json()
    print(data)
    response = jsonify(result="not logged in")
    return response
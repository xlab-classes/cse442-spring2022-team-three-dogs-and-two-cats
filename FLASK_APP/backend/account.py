from unittest import result
from flask import request, jsonify
from flask_cors import cross_origin
import string   
from .home_login import check_token
from flask import Blueprint

account = Blueprint('account', __name__)

@account.route("/account", methods=['POST', 'GET', 'OPTIONS'])

def accountPage():
    None
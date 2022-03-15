from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin
from .home_login import home_login

from flaskext.mysql import MySQL
# import json
# import os
# from dotenv import load_dotenv
# import logging

# APP_ROOT = os.path.join(os.path.dirname(__file__), '..')   # refers to application_top
# dotenv_path = os.path.join(APP_ROOT, '.env')
# load_dotenv(dotenv_path)

# mysql_host = os.getenv("DB_HOST")
# mysql_port = os.getenv("DB_PORT")
# mysql_dbname = os.getenv("DB_DATABASE")
# mysql_user = os.getenv("DB_USERNAME")
# mysql_password = os.getenv("DB_PASSWORD")

# connection = None
# CONNECTION_TIMEOUT = 5000

# print(mysql_host)
# print(mysql_port)
# print(mysql_dbname)
# print(mysql_user)

app = Flask(__name__)
app.config['MYSQL_DATABASE_HOST'] = 'oceanus.cse.buffalo.edu'
app.config['MYSQL_DATABASE_USER'] = 'johnbudn'
app.config['MYSQL_DATABASE_PASSWORD'] = '50382208'
app.config['MYSQL_DATABASE_DB'] = 'cse442_2022_spring_team_n_db'

global mysql
mysql = MySQL(app)



app.register_blueprint(home_login)

CORS(app)



    

if __name__ == '__main__':
    app.run(debug=False)


   
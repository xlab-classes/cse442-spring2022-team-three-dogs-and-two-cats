from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from .sign_up import sign_up
from .home_login import home_login
from .student_group import student_group

from flaskext.mysql import MySQL

app = Flask(__name__)
app.config['MYSQL_DATABASE_HOST'] = 'oceanus.cse.buffalo.edu'
app.config['MYSQL_DATABASE_USER'] = 'johnbudn'
app.config['MYSQL_DATABASE_PASSWORD'] = '50382208'
app.config['MYSQL_DATABASE_DB'] = 'cse442_2022_spring_team_n_db'

global mysql
mysql = MySQL(app)


app = Flask(__name__)

app.register_blueprint(home_login)

app.register_blueprint(sign_up)

app.register_blueprint(student_group)

CORS(app)

if __name__ == '__main__':
    app.run(debug=False)

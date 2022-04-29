from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


from .sign_up import sign_up
from .home_login import home_login
from .student_group import student_group
from .enter_course_instructor import enter_course_instructor
from .home_instructor import home_instructor
from .home_student import home_student
from .group_profile import group_profile
from .messsage import message
from .account import account
from .forget_password import reset_password
from flask_mail import Mail

from flaskext.mysql import MySQL

app = Flask(__name__)
cors = CORS(app,  supports_credentials = True)
app.config['MYSQL_DATABASE_HOST'] = 'oceanus.cse.buffalo.edu'
app.config['MYSQL_DATABASE_USER'] = 'johnbudn'
app.config['MYSQL_DATABASE_PASSWORD'] = '50382208'
app.config['MYSQL_DATABASE_DB'] = 'cse442_2022_spring_team_n_db'


global mysql
mysql = MySQL(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = '3dogs.2cats.reset@gmail.com'
app.config['MAIL_PASSWORD'] = 'Abc12345678@'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
global mail
mail = Mail(app)


def corsFix(res):
    # res.add('Access-Control-Allow-Origin', 'http://cheshire.cse.buffalo.edu:3000')
    res.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
    res.add('Access-Control-Allow-Credentials', 'true')


app.register_blueprint(home_login)

app.register_blueprint(sign_up)

app.register_blueprint(student_group)

app.register_blueprint(home_instructor)

app.register_blueprint(home_student)

app.register_blueprint(enter_course_instructor)

app.register_blueprint(group_profile)

app.register_blueprint(message)

app.register_blueprint(account)

app.register_blueprint(reset_password)


if __name__ == '__main__':
    app.run(debug=False)

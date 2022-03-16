from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


from .home_login import home_login

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


CORS(app)

if __name__ == '__main__':
    app.run(debug=False)

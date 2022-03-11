from flask import Flask
from flask import Flask, render_template, request
# import mysql.connector



app = Flask(__name__)
#app.register_blueprint(login)
print("socket started ... ...")

@app.route("/home_login")
def main():
    return render_template('loginPages/home_login.html')



if __name__ == "__main__":
    app.run()
   


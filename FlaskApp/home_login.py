import mysql.connector
from flask import Flask, request


app = Flask(__name__)



# def main():

#     mydb = mysql.connector.connect(user='xliu95', password='50306778',host='oceanus.cse.buffalo.edu',database='cse442_2022_spring_team_n_db')

#     mycursor = mydb.cursor()
    
#     mycursor.execute("SELECT * FROM user;")
    
#     myresult = mycursor.fetchall()
    
#     for x in myresult:
#         print(x)
    
#     mydb.close()

# @app.route('/home_login',method=['POST'])
# def login(username,password):
#     data = request.get_json()
#     print(data)

#     mydb = mysql.connector.connect(user='xliu95', password='50306778',host='oceanus.cse.buffalo.edu',database='cse442_2022_spring_team_n_db')

#     mycursor = mydb.cursor()
#     sql = "INSERT INTO user (user1, pass1,firstname1, lastname1,email,0)"
#     sql= "SELECT is_professor FROM user WHERE username =%s and password=%s"
#     val = (username,password)
#     mycursor.execute(sql,val)
#     myresult = mycursor.fetchall()
#     print(myresult)
#     # return False if it is an inviald user
#     if len(myresult) == 0:
#         print("error")
#         mydb.close()
#         return (False,"Student")  
#     else:
#         # returns True and Student if the user is a student
#         if myresult[0][0] == 0:
#             print("student")
#             mydb.close()
#             return (True,"Student")
#         # returns True and Professor if the user is a prof
#         else:
#             print("prof")
#             mydb.close()
#             return (False,"Professor")

    




# if __name__ == "__main__":
#     login("DemoStudent","DemoPass")
#     login("DemoProf", "DemoPass")
#     login("DemoStudent","WrongPass")
#     app.run()
   
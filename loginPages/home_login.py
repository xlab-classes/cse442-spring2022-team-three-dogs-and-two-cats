import mysql.connector

def login():

    mydb = mysql.connector.connect(user='qinranwa', password='50307911',host='oceanus.cse.buffalo.edu',database='cse442_2022_spring_team_n_db')

    mycursor = mydb.cursor()
    
    mycursor.execute("SELECT * FROM user;")
    
    myresult = mycursor.fetchall()
    
    for x in myresult:
        print(x)

    mydb.close()


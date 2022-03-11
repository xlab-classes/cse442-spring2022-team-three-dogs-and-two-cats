import mysql.connector



def getmydb():

    mydb = mysql.connector.connect(user='xliu95', password='50306778',host='oceanus.cse.buffalo.edu',database='cse442_2022_spring_team_n_db')

    mycursor = mydb.cursor()

    return mycursor
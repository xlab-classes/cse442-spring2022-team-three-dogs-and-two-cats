import mysql.connector

def main():

    mydb = mysql.connector.connect(user='xliu95', password='50306778',host='oceanus.cse.buffalo.edu',database='cse442_2022_spring_team_n_db')

    mycursor = mydb.cursor()
    
    mycursor.execute("SELECT * FROM user;")
    
    myresult = mycursor.fetchall()
    
    for x in myresult:
        print(x)

    mydb.close()

if __name__ == "__main__":
    main()
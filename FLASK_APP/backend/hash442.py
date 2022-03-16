import hashlib
import random
import string

#Hashes a given plaintext, returns hash object and salt tuple, not string. For string use digest()
def toHash(input, salt = None):
    if salt == None:
     rand = string.ascii_letters
     salt = ''.join(random.choice(rand) for i in range (32))
    input += salt
    return (hashlib.sha256(input.encode()), salt)

#Hash object to string
def digest(input):
    return input.hexdigest()

#Compares a plaintext input with a record in user table. Returns true if hash matches, false otherwise. Returns false on no DB match
def compareUserHash(userInput, _username):
    from .app import mysql
    cursor = mysql.connect().cursor()
    print( "username is " ,_username)
    # cursor.execute("SELECT password, salt FROM user password WHERE username = '"+_username+"'")
    cursor.execute("SELECT password, salt FROM user WHERE username = %s",_username)
    storedHashObj = cursor.fetchone()
    print("storedHashObj" , storedHashObj)
    
    if storedHashObj: 
        print("here")
        storedHash = storedHashObj[0]
        salt = storedHashObj[1]
        userHash = toHash(userInput, salt)
        print(userHash)
        return digest(userHash[0]) + salt == storedHash + salt
    else:
        return False


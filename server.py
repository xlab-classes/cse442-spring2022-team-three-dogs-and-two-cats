import socketserver
import sys
import os
from loginPages import home_login as hl


class MyTCPHandler(socketserver.BaseRequestHandler):

    def handle(self):
        received_data = self.request.recv(2048).strip()

        if len(received_data) == 0:
            return

        request = received_data.decode()
        r = request.split(" ")

        if r[0] == 'POST':
            print("post received")
            print(request)
            
            print(received_data)
            if r[1] == "/login":
                login = request.split("/r/n/r/n")
                print(login[1])

        sys.stdout.flush()
        sys.stderr.flush()


if __name__=="__main__":

    host="cheshire.cse.buffalo.edu"
    port =8000

    server = socketserver.ThreadingTCPServer((host, port), MyTCPHandler)

    server.serve_forever()

    # print("Listening on port" + str(port))
    sys.stdout.flush()
    sys.stderr.flush()
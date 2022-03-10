import socketserver
import sys
import os

class MyTCPHandler(socketserver.BaseRequestHandler):

    def handle(self):
        received_data = self.request.recv(2048).strip()

        if len(received_data) == 0:
            return

        request = received_data.decode()
        r = request.split(" ")

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
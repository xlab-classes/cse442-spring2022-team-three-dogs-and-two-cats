import socketserver
import sys
import os
# from loginPages import home_login as hl


class MyTCPHandler(socketserver.BaseRequestHandler):

    def handle(self):
        received_data = self.request.recv(2048).strip()

        if len(received_data) == 0:
            return

        request = received_data.decode()
        r = request.split(" ")
        print(request)

        if r[0] == 'POST':
            print("post received")
            print(request)

            print(received_data)
            if r[1] == "/login":
                login = request.split("/r/n/r/n")
                print(login[1])

        elif r[1] == "/":
            print("get root")
            #html
            file_name = "loginPages/home_login.html"
            html_file = open(file_name, "r")
            content = html_file.read()
            file_size = os.path.getsize(file_name)
            html_file.close()
            response = "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8 \r\nX-Content-Type-Options: nosniff\r\nContent-Length: " + str(file_size) + "\r\n\r\n" + content
            self.request.sendall(response.encode())

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
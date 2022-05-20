The code is currently deployed to the UB CSE cheshire webserver. The specific directory is: /web/CSE442-552/2022-Spring/cse-442n/cse442-spring2022-team-three-dogs-and-two-cats/. It is currently running at http://cheshire.cse.buffalo.edu:3000/.

In case it isn’t running; the following instructions will teach you how to run the project.

On the CSE webserver:
To reproduce our code on the school server, you will need to know how to use the Linux screen command. You don’t need to download any libraries, as they are included in the virtual envornments. The following steps illustrate how to reproduce our code on the school server.

1. Navigate to the root directory of our project.
2. Use screen to create a new screen.
3. Open bash.
4. Run . /venv/bin/activate
5. Run . /nenv/bin/activate
6. Run npm start
7. Use screen to create a new screen
8. Open bash
9. Run . /flaskEnv/bin/activate
10. Cd to FLASK_APP/backend/
11. Run python3.8 -m flask run -h 128.205.32.39 -p 5100

After that, the project should be running on the port npm assigned, e.g: cheshire.cse.buffalo.edu:3000/. It should be noted that you will need to be connected to the UB network either directly or via VPN inorder to access the website. 

On a local machine:
The following steps illustrate how to reproduce our code off the school server. Before you can run the code, you will need to install the required libraries. This can be done by executing the following commands in the root folder of our project:
npm install
pip install -r pip_reqs.txt

After installation, you can run the project with the following steps: 

1. Open a new command prompt at the project's root directory.
2. Run npm start
3. Open a new command prompt at /FLASK_APP/backend/
4. Run python3.8 -m flask run.
After that, the project should be running on localhost on the port npm assigned, e.g: localhost:3000/.


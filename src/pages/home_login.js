import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_login.module.css'
import { Redirect } from 'react-router';
import Alert from 'react-bootstrap/Alert'
// import { Alert } from '../_components';
import Navbar from 'react-bootstrap/Navbar'

// import Form from 'react-bootstrap/Form'
// import Container from 'react-bootstrap/Container'

import axios from 'axios';

import { Container,Row,Form,Button,Col } from 'react-bootstrap';
import {ListGroup,Card} from 'react-bootstrap'


const HomeLogin = () => {
  const [username,setUsername] = useState('');
  const [password,SetPassword] = useState('');
  const [error,setError] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [student,setStudent] = useState('false');
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  const login= (e) =>{
    e.preventDefault();
    // test submmit button
    console.log(username)
    console.log(password)
    // history.push("/home_instructor")
    // window.location.reload(false);
    axios.post('http://128.205.32.39:5100/ ',{username:username, password:password}).then(
      response=>{
          console.log(response)

          // Check if user is a student
          if (response.data.result === 'Student'){
            setStudent(true)
            console.log('Student login passed', response);
            history.push("/home_student")
            window.location.reload(false);

          }

          // Check if user is a professor
          else if (response.data.result === 'Professor'){
            setStudent(false)
            console.log('Student login passed', response);
            history.push("/home_instructor");
            window.location.reload(false);
          }

          else if (response.data.result === "username or password cannot be empty"){
            console.log(response.data);
            setEmpty(true);
            setAlert(true);

          }

          // else return error
          else{
              console.log(response.data);
              setError(true);
              // setAlert(true);
  
          }

      })
  .catch(error=>{ console.log(error) })
  }



  return (
    <div className={styles['container']}>
      {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
      <Helmet>
        <title>project</title>
        <meta property="og:title" content="project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['webname']}>
          <span>&lt;Webname&gt;</span>
        </span>
        <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
          <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
        </svg>
    </div> 

  
    <Alert show={alert} className={styles["alert"]}>
    <span className={styles["closebtn"]} onClick={()=>{setAlert(false)}}>&times;</span> 
        <p>
          Invalid username or password
        </p>
    </Alert>


    {/*Here is Login Form */}
      <form className={styles['login']} onSubmit={login}> 
      
        <span className={styles['title']}>Log In</span>

      {/* Here is input for username */}
        <span className={styles['username']}>Username</span>
        <input
          type="text"
          className={` ${styles['usernametextbox']} ${projectStyles['input']} `}
          onChange={(e)=>{
            setUsername(e.target.value)
          }} 
        />

      {/* Here is forgot username */} 
        <Link to="/retrieve_username" className={styles['forgotusername']}>
          Forgot Username?
        </Link>

      {/* Here is input for password */} 
        <span className={styles['password']}>Password</span>
        <input
          type="text"
          className={` ${styles['passwordtextbox']} ${projectStyles['input']} `}
          type="password"
          onChange={(e)=>{
            SetPassword(e.target.value)
          }} 
      
        />

      {/* Here is for reset password */}
        <Link to="/reset_password" className={styles['forgotpassword']}>
          Forgot Password?
        </Link>

      {/* Here id rememberme */}
        <div className={styles['rememberme']}>
          <div className={styles['remembermecheckbox']}></div>
          <span className={styles['remembermetext']}>Remember Me</span>
        </div>

      {/* Changed div to button submit */}
      {empty
        ?<button className={styles['loginbutton']} onClick={() => setAlert(true)}>
          <span className={styles['logintext']}>Login</span>
        </button> 
        
        
        :<button type="submit" className={styles['loginbutton']} type="submit">
        <span className={styles['logintext']}>Login</span>
        </button> 
      }

      {/* Signup link */}
        <Link to="/sign_up" className={styles['signup']}>
          Don&apos;t have an account? Sign up!
        </Link>
      </form>

      {/*temp link */}
      <Link to="/home_instructor" className={styles['templogininstructor']}>
        Temp Login Instructor
      </Link>
      <Link to="/home_student" className={styles['temploginstudent']}>
        Temp Login Student
      </Link>
    </div>
  )
}

export default HomeLogin

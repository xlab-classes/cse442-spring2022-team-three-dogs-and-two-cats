import React, { useState }from 'react'
import { Link, useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_login.module.css'
import { Redirect } from 'react-router';

// import Form from 'react-bootstrap/Form'
// import Container from 'react-bootstrap/Container'

import axios from 'axios';

import { Container,Row,Form,Button,Col } from 'react-bootstrap';
import {ListGroup,Card} from 'react-bootstrap'


const HomeLogin = () => {
  const [username,setUsername] = useState('');
  const [password,SetPassword] = useState('');
  const [error,setError] = useState('');
  const [student,SetStudent] = useState('false');
  const history = useHistory();

  const login= (e) =>{
    e.preventDefault();

    // test submmit button
    console.log(username)
    console.log(password)
    history.push("/home_instructor")
    window.location.reload(false);

    // Send the username and password to backend.
    axios.post('login',{username:username, password:password}).then(
        response=>{
            console.log(response)

            // Check if user is a student
            if (response.data.result === 'Student'){
               SetStudent(true)
               console.log('Student login passed', response);
                // localStorage.setItem('token',response.data.token);
                // onNameChange(response.data.username)
                // history.push("/home_instructor")
                // window.location.reload(false);
                
                history.push("/home_instructor")
                window.location.reload(false);

            }

            // Check if user is a professor
            else if (response.data.result === 'Professor'){
              SetStudent(false)
              console.log('Student login passed', response);
              history.push("/home_instructor");
              window.location.reload(false);
            }

            // else return error
            else{
                console.log(response.data);
                setError(response.data.result);
            }

        })
    .catch(error=>{ console.log(error) })
}



  return (
     
    <div className={styles['container']}>
 
     
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

  {/*Here is Login Form */}
  {/* Changed div to Form */}
      <Form className={styles['login']} onSubmit={login}>
        
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
        {/* <Link to="/retrieve_username" className={styles['forgotusername']}>
          Forgot Username?
        </Link> */}
        {/* <br></br> */}
        
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
        {/* <Link to="/reset_password" className={styles['forgotpassword']}>
          Forgot Password?
        </Link> */}

    {/* Here id rememberme */}
        {/* <div className={styles['rememberme']}>
          <div className={styles['remembermecheckbox']}></div>
          <span className={styles['remembermetext']}>Remember Me</span>
        </div> */}

    {/* Changed div to button submit */}
        <button type="submit" className={styles['loginbutton']} type="submit">
          <span className={styles['logintext']}>Login</span>
        </button> 
     
        <Link to="/sign_up" className={styles['signup']}>
          Don&apos;t have an account? Sign up!
        </Link>
      </Form>

      <Link to="/home_instructor" className={styles['templogininstructor']}>
        Temp Login Instructor
      </Link>
      <Link to="/home_student" className={styles['temploginstudent']}>
        Temp Login Student
      </Link>
      {/* <Route exact path="/">
        {loggedIn ? <Redirect to="/home_instructor" /> : <PublicHomePage />}
      </Route> */}
      {/* <Route exact path={`/home_instructor`}/> */}
    </div>
    
  )
}

export default HomeLogin

import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import { Helmet } from 'react-helmet'

import projectStyles from '../style.module.css'
import styles from './sign_up.module.css'
import axios from "axios";
import {Form} from "react-bootstrap";



const Signup = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email,setEmail] = useState('');
  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [professor,setProfessor] = useState(false);
  const [student,setStudent] = useState(false);
  const [error,setError] = useState('');
  const history = useHistory();

  const signup= (e) =>{
    e.preventDefault();
    axios.post('http://128.205.32.39:5100/sign_up',{email:email, username:username, firstname:firstname, lastname:lastname, password:password, password2:password2, professor:professor, student:student}).then(
      response=>{
          if (response.data.result === 'Student'){
             console.log('Student account created successfully', response);
             history.push("/");
             window.location.reload(false);
          }
          // Check if user is a professor
          else if (response.data.result === 'Professor'){
             console.log('Professor account created successfully', response);
             history.push("/");
             window.location.reload(false);
          }
      })

  }

  function is_student() {
    document.getElementById("isInstructor").checked = false;
    document.getElementById("isStudent").checked = true;
    setProfessor(false);
    setStudent(true);
    return null;
  }

  function is_instructor() {
    document.getElementById("isInstructor").checked = true;
    document.getElementById("isStudent").checked = false;
    setProfessor(true);
    setStudent(false);
    return null;
  }

  return (
    <div className={styles['container']}>
      <Helmet>
        <title>sign_up - project</title>
        <meta property="og:title" content="sign_up - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['webname']}>
          <span>&lt;Webname&gt;</span>
        </span>
        <Link to="/" className={styles['navlink']}>
          <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"/>
          </svg>
        </Link>
      </div>
      <Form className={styles['createaccount']} onSubmit={signup}>
        <span className={styles['title']}>Create Account</span>
        <span className={styles['email']}>Email</span>
        <input
          type="text"
          className={` ${styles['emailtextbox']} ${projectStyles['input']} `}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
        />
        <span className={styles['username']}>Username</span>
        <input
          type="text"
          className={` ${styles['usernametextbox']} ${projectStyles['input']} `}
          onChange={(e)=>{
            setUsername(e.target.value);
          }}
        />
        <div className={styles['names']}>
          <span className={styles['firstname']}>
            <span>First Name</span>
          </span>
          <span className={styles['lastname']}>
            <span>Last Name</span>
          </span>
        </div>
        <div className={styles['namestextbox']}>
          <input
            type="password"
            className={` ${styles['firstnametextbox']} ${projectStyles['input']} `}
            onChange={(e)=>{
            setFirstName(e.target.value);
          }}
          />
          <input
            type="password"
            className={` ${styles['lastnametextbox']} ${projectStyles['input']} `}
            onChange={(e)=>{
            setLastName(e.target.value)
          }}
          />
        </div>
        <span className={styles['password']}>
          <span>Password</span>
        </span>
        <input
          type="password"
          className={` ${styles['passwordtextbox']} ${projectStyles['input']} `}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />
        <span className={styles['retypepass']}>
          <span>Retype Password</span>
        </span>
        <input
          type="password"
          className={` ${styles['retypepasstextbox']} ${projectStyles['input']} `}
          onChange={(e)=>{
            setPassword2(e.target.value)
          }}
        />
        <div className={styles['checkboxes']}>
          <div className={styles['instructor']}>
              <label><input type="checkbox" onClick={is_instructor} id="isInstructor" name="isInstructor"/><span className={styles['instructortext']}>Instructor</span></label>
          </div>
          <div className={styles['student']}>
            <label><input type="checkbox" onClick={is_student} id="isStudent" name="isStudent"/><span className={styles['studenttext']}>Student</span></label>
          </div>
        </div>
        <div className={styles['buttons']}>
            <button type="submit" className={styles['signupbutton']} type="submit">
                <span className={styles['signuptext']}>Sign Up</span>
            </button>
          <Link to="/" className={styles['navlink1']}>
            <div className={styles['cancelbutton']}>
              <span className={styles['canceltext']}>Cancel</span>
            </div>
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default Signup

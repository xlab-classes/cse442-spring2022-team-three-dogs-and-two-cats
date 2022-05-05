import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from "axios";
import { Helmet } from 'react-helmet'

import projectStyles from '../style.module.css'
import styles from './reset_password.module.css'


const ResetPassword = () => {
  const [email,setEmail] = useState('');
  const history = useHistory();

  const SendEmail= (e) =>{

    e.preventDefault();

    console.log(email)

    //server
     axios.post('http://128.205.32.39:5100/',{email:email}).then(
    //local
    //axios.post('http://127.0.0.1:5000/reset_password',{email:email}).then(
      response=>{
        if (response.data.result == "account info updated"){
          window.alert("You will receive a temporary password in your mailbox.");
          history.push("/");
          
        }
        else{
          window.alert("Email does not exist. Please create an account first or enter a valid email address.");
        }
          console.log(response)

      })
  .catch(error=>{ console.log(error) })
  }

  return (
    <div className={styles['container']}>
      <Helmet>
        <title>Forgot Password</title>
        <meta property="og:title" content="reset_password - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['webname']}>
          <span>Groupo</span>
        </span>
        <Link to="/" className={styles['navlink']}>
          <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
          </svg>
        </Link>
      </div>
      <form className={styles['resetpassword']} onSubmit={SendEmail}>
        <span className={styles['title']}>Reset Password</span>
        <span className={styles['desc']}>
          <span>Enter the email address you used and we will</span>
          <br></br>
          <span>send you a temporary password.</span>
        </span>
        <span className={styles['email']}>Email</span>
        <input
          type="email"
          className={` ${styles['emailtextbox']} ${projectStyles['input']} `}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
        />
        
        <div className={styles['buttons']}>
          <button type="submit" className={styles['resetbutton']}>
            <span className={styles['resettext']}>Sent</span>
          </button>
          <Link to="/" className={styles['navlink1']}>
            <button className={styles['cancelbutton']}>
              <span className={styles['canceltext']}>Cancel</span>
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
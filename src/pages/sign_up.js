import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import projectStyles from '../style.module.css'
import styles from './sign_up.module.css'

const SignUp = () => {
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
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
          </svg>
        </Link>
      </div>
      <div className={styles['createaccount']}>
        <span className={styles['title']}>Create Account</span>
        <span className={styles['email']}>Email</span>
        <input
          type="text"
          className={` ${styles['emailtextbox']} ${projectStyles['input']} `}
        />
        <span className={styles['username']}>Username</span>
        <input
          type="text"
          className={` ${styles['usernametextbox']} ${projectStyles['input']} `}
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
            type="text"
            className={` ${styles['firstnametextbox']} ${projectStyles['input']} `}
          />
          <input
            type="text"
            className={` ${styles['lastnametextbox']} ${projectStyles['input']} `}
          />
        </div>
        <span className={styles['password']}>
          <span>Password</span>
        </span>
        <input
          type="text"
          className={` ${styles['passwordtextbox']} ${projectStyles['input']} `}
        />
        <span className={styles['retypepass']}>
          <span>Retype Password</span>
        </span>
        <input
          type="text"
          className={` ${styles['retypepasstextbox']} ${projectStyles['input']} `}
        />
        <div className={styles['checkboxes']}>
          <div className={styles['instructor']}>
            <div className={styles['checkbox']}></div>
            <span className={styles['instructortext']}>Instructor</span>
          </div>
          <div className={styles['student']}>
            <div className={styles['checkbox1']}></div>
            <span className={styles['studenttext']}>Student</span>
          </div>
        </div>
        <div className={styles['buttons']}>
          <div className={styles['signupbutton']}>
            <span className={styles['siguptext']}>Sign Up</span>
          </div>
          <Link to="/" className={styles['navlink1']}>
            <div className={styles['cancelbutton']}>
              <span className={styles['canceltext']}>Cancel</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp

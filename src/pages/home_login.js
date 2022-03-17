import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import projectStyles from '../style.module.css'
import styles from './home_login.module.css'

const HomeLogin = () => {
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
      <div className={styles['login']}>
        <span className={styles['title']}>Log In</span>
        <span className={styles['username']}>Username</span>
        <input
          type="text"
          className={` ${styles['usernametextbox']} ${projectStyles['input']} `}
        />
        <Link to="/retrieve_username" className={styles['forgotusername']}>
          Forgot Username?
        </Link>
        <span className={styles['password']}>Password</span>
        <input
          type="text"
          className={` ${styles['passwordtextbox']} ${projectStyles['input']} `}
        />
        <Link to="/reset_password" className={styles['forgotpassword']}>
          Forgot Password?
        </Link>
        <div className={styles['rememberme']}>
          <div className={styles['remembermecheckbox']}></div>
          <span className={styles['remembermetext']}>Remember Me</span>
        </div>
        <div className={styles['loginbutton']}>
          <span className={styles['logintext']}>Login</span>
        </div>
        <Link to="/sign_up" className={styles['signup']}>
          Don&apos;t have an account? Sign up!
        </Link>
      </div>
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

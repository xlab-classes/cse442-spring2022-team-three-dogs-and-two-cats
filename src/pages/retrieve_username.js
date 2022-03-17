import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import projectStyles from '../style.module.css'
import styles from './retrieve_username.module.css'

const RetrieveUsername = () => {
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>retrieve_username - project</title>
        <meta property="og:title" content="retrieve_username - project" />
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
      <div className={styles['retrieveusername']}>
        <span className={styles['title']}>Retrieve Username</span>
        <span className={styles['desc']}>
          <span>Enter the email address you used and we will</span>
          <br></br>
          <span>send you an email containing your username.</span>
        </span>
        <span className={styles['email']}>Email</span>
        <input
          type="text"
          className={` ${styles['emailtextbox']} ${projectStyles['input']} `}
        />
        <div className={styles['buttons']}>
          <div className={styles['retrievebutton']}>
            <span className={styles['retrievetext']}>Retrieve</span>
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

export default RetrieveUsername
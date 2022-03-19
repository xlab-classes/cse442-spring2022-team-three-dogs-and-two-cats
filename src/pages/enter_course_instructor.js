import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from './enter_course_instructor.module.css'

import Dropdown from "../misc/dropdown"

const EnterCourseInstructor = () => {
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>enter_course_instructor - project</title>
        <meta property="og:title" content="enter_course_instructor - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['coursename']}>
          <span>Course Name</span>
        </span>
        <Link to="/home_instructor" className={styles['navlink']}>
          <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
          </svg>
        </Link>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown/>
        </span>
        
      </div>
    </div>
  )
}

export default EnterCourseInstructor

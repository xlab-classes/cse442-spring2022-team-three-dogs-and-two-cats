import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_student.module.css'

import Dropdown from "../misc/dropdown"

const HomeStudent = () => {
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>home_student - project</title>
        <meta property="og:title" content="home_student - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['webname']}>
          <span>&lt;Webname&gt;</span>
        </span>
        <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
          <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
        </svg>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown/>
        </span>

      </div>
      <div className={styles['center']}>
        <div className={styles['coursesheader']}>
          <span className={styles['yourcourses']}>Your Courses</span>
          <input
            type="text"
            placeholder="Enter Class Code"
            className={` ${styles['entercode']} ${projectStyles['input']} `}
          />
          <div className={styles['joinbutton']}>
            <span className={styles['join']}>Join</span>
          </div>
        </div>
        <div className={styles['sort']}>
          <span className={styles['sortby']}>Sory By</span>
          <div className={styles['sortoptions']}>
            <span className={styles['newtoold']}>New to Old</span>
          </div>
        </div>
        <div className={styles['coursesection']}>
          <div className={styles['course']}>
            <span className={styles['coursename']}>Course Name</span>
            <Link to="/enter_course_student" className={styles['navlink']}>
              <div className={styles['enterbutton']}>
                <span className={styles['enter']}>Enter</span>
              </div>
            </Link>
            <div className={styles['group']}>
              <span className={styles['nogroup']}>No Group</span>
            </div>
          </div>
          <span className={styles['code']}>Code: ######</span>
        </div>
      </div>
    </div>
  )
}

export default HomeStudent

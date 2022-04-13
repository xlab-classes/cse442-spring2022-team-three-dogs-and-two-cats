import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_student.module.css'
import Dropdown from "../misc/dropdown"
import Studentcourse from '../misc/student_course'
import axios from 'axios'

const HomeStudent = ({messageNumber}) => {

  const [class_code, setClasscode] = useState('')
  const [classeslst, setClasses] = useState([])
  const [username, setUsername] = useState('')

  // local path:http://127.0.0.1:5000/home_student
  // server path:http://128.205.32.39:5100/home_student

  //load user's classes
  useEffect(() => {
    axios.post('http://127.0.0.1:5000/home_student', { class_code: class_code }).then(
      response => {
        setUsername(response.data.username)
        setClasses(response.data.classeslst)
        console.log(response.data.classeslst)
      })
    axios.options('http://127.0.0.1:5000/home_student')
      .catch(err => { console.log(err) })
  }, [])


  //enter class code
  function submitHandler(event) {
    event.preventDefault()

    if (class_code.length == 0) {
      window.alert("No class code entered.")
    }

    axios.post('http://127.0.0.1:5000/home_student', { class_code: class_code }).then(
      response => {
        const resp = response.data.result
        console.log(resp)
        if (resp == "CLASS ALREADY JOINED") {
          window.alert("Class already joined, please enter a valid class code.")
        }
        if (resp == "INVALID CODE") {
          window.alert("Class does not exist, please enter a valid class code.")
        }
        if (resp == "VALID CODE, CLASS JOINED") {
          window.location.reload()
        }
      })  
    axios.options('http://127.0.0.1:5000/home_student')
      .catch(err => { console.log(err) })
  }


  return (
    <div className={styles['container']}>
      <Helmet>
        <title>home_student - project</title>
        <meta property="og:title" content="home_student - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['webname']}>
          <span>Webname</span>
        </span>
        <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
          <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
        </svg>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown username={username} messageNumber = {messageNumber}/>
        </span>

      </div>
      <div className={styles['center']}>

        {/* join class form */}
        <form className={styles['coursesheader']} onSubmit={submitHandler} onChange={(event) => setClasscode(event.target.value)}>
          <span className={styles['yourcourses']}>Your Courses</span>

          {/* join new class */}
          <input
            type="text"
            placeholder="Enter Class Code"
            className={` ${styles['entercode']} ${projectStyles['input']} `}
          />
          <button className={styles['joinbutton']} type="submit">
            <span className={styles['join']}>Join</span>
          </button>
        </form>
        {/* ------------------------------- */}

        <div className={styles['sort']}>
          <span className={styles['sortby']}>Sory By</span>
          <div className={styles['sortoptions']}>
            <span className={styles['newtoold']}>New to Old</span>
          </div>
        </div>

        {/* load courses */}
        {classeslst.map(e =>
          <Studentcourse class_code={e.class_code} class_name={e.class_name} group_code={e.group_code}/>
        )}
        {/* ------------------------------- */}

      </div>
    </div>
  )
}

export default HomeStudent

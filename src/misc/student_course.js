import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../pages/home_student.module.css'
import axios from 'axios'

const Studentcourse = (props) => {
    return (
        <div className={styles['coursesection']}>
            <div className={styles['course']}>
                
                <span className={styles['coursename']}>{props.class_name}</span>
                
                <Link code={props.class_code} to="/enter_course_student">
                    <div className={styles['enterbutton']}>
                        <span className={styles['enter']}>Enter</span>
                    </div>
                </Link>
                <div className={styles['group']}>
                    <span className={styles['nogroup']}>No Group</span>
                </div>

            </div>
            <span className={styles['code']}>Code: {props.class_code}</span>
        </div>
    )
}

export default Studentcourse
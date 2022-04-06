import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../pages/home_instructor.module.css'
import axios from 'axios'

const ProfClass = (props) => {
    return (
        <div className={styles['coursesection']}>
            <div className={styles['course']}>
                
                <span className={styles['coursename']}>{props.class_name}</span>
                <Link to="/enter_course_instructor" className={styles['navlink']}>
                    <button className={styles['enterbutton']}>
                    <span className={styles['enter']}>Enter</span>
                    </button>
                </Link>
                <div className={styles['deletebutton']}>
                    <span className={styles['delete']}>Delete</span>
                </div>  
            </div>
              

            <span className={styles['code']}>Code: {props.class_code}</span>
        </div>
    )
}


export default ProfClass
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../pages/home_instructor.module.css'

const ProfClass = (props) => {
    return (
        <div className={styles['coursesection']}>
            <div className={styles['course']}>

                <span className={styles['coursename']}>{props.class_name}</span>
                <Link to={{pathname:"/enter_course_instructor", state:{code:props.class_code}}}>
                    <div className={styles['enterbutton']}>
                        <span className={styles['enter']}>Enter</span>
                    </div>
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
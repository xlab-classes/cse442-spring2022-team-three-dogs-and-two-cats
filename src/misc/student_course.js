import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/home_student.module.css'


const Studentcourse = (props) => {

    const group_code = props.group_code
    let showGroup
    let enterButton


    if (group_code == null) {
        showGroup =
            <div className={styles['group1']}>
                <span className={styles['nogroup']}>No Group</span>
            </div>
        enterButton =
            <Link to={{ pathname: "/enter_course_student", state: { code: props.class_code } }}>
                <div className={styles['enterbutton']}>
                    <span className={styles['enter']}>Enter</span>
                </div>
            </Link>
    }

    else {
        showGroup =
            <div className={styles['group2']}>
                <span className={styles['ingroup']}>In Group</span>
            </div>
        enterButton =
            <Link to={{ pathname: "/group_profile", state: { groupcode: props.group_code, name: props.name, classcode: props.class_code } }}>
                <div className={styles['enterbutton']}>
                    <span className={styles['enter']}>Enter</span>
                </div>
            </Link>
    }


    return (
        <div className={styles['coursesection']}>
            <div className={styles['course']}>

                <span className={styles['coursename']}>{props.class_name}</span>

                {enterButton}
                {showGroup}

            </div>
            <span className={styles['code']}>Code: {props.class_code}</span>
        </div>
    )
}

export default Studentcourse
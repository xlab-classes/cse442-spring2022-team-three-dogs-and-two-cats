import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_student.module.css'
import Dropdown from "../misc/dropdown"
import Studentcourse from '../misc/student_course'
import axios from 'axios'

const GroupProfile = () => {

    const [isStudent, setStudent] = useState(false)
    const [inGroup, setGroup] = useState(false)
    const [group_code, setGroupCode] = useState('')
    const [classcode, setClassCode] = useState('')


    //load at beginning of page
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/group_profile', { group_code: group_code, classcode: classcode }).then(
            response => {
                console.log("testing")
            })

        axios.options('http://127.0.0.1:5000/group_profile')
            .catch(err => { console.log(err) })
    }, [])


    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.state.code); // result: 'some_value'
    }, [location]);


    return (
        <div> ClassCode:{location.state.code} </div>
    )
}


export default GroupProfile
import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_student.module.css'
import Dropdown from "../misc/dropdown"
import axios from 'axios'
import './group_profile.css'


const GroupProfile = () => {

    const location = useLocation()
    const name = location.state.name
    const groupname = location.state.groupname

    const [group_code, setGroupCode] = useState('')
    const [classcode, setClassCode] = useState('')
    const [isProf, setProf] = useState(false)

    const [groupID, setID] = useState('')
    const [sectionNum, setNum] = useState('')
    const [groupMems, setMems] = useState([])
    const [desc, setDesc] = useState('')

    


    //load at beginning of page
    useEffect(() => {
        setGroupCode(location.state.groupcode)
        setClassCode(location.state.classcode)

        console.log("-------------------------")
        console.log(group_code)
        console.log(classcode)
        

        axios.get('http://127.0.0.1:5000/group_profile', {params:{group_code: group_code, classcode: classcode}}).then(
            response => {
                console.log(response.request)
            })

        axios.options('http://127.0.0.1:5000/group_profile')
            .catch(err => { console.log(err) })
    }, [])


    function editDesc(event) {
        event.preventDefault()
        window.alert("Implement edit desc")
    }


    let buttons
    if (isProf == false) {
        buttons = 
        <div className='profileButtons'>
            <button className='b'>Invite</button>
            <button className='b'>Leave the Group</button>
        </div>
    }
    else if (isProf == true) {
        buttons =
        <div className='profileButtons'>
            <button className='b'>Delete Member</button>
        </div>
    }

    return (
        <div className={styles['container']}>
            
            {/* navbar */}
            <Helmet>
                <title>home_student - project</title>
                <meta property="og:title" content="home_student - project" />
            </Helmet>
            <div className={styles['header']}>
                <span className={styles['webname']}>
                    <span>{groupname}</span>
                </span>
                <Link to="/home_student" className={styles['navlink']}>
                <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
                    <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
                </svg>
                </Link>
                {/* name dropdown */}
                <span className={styles['name']}>
                    <Dropdown username={name} />
                </span>
            </div>
            {/* ------------------------------- */}

            {/* profile */}
            <div className='profileBox'>
                {buttons}
                <div className='row1'>
                    <div className='textID'><b>Group ID: </b>test</div>
                    <div className='textNum'><b>Section Number: </b>test</div>
                </div>
                <div className='row2'>
                    <div classNa
                    me='textGroup'><b>Group Members:</b></div>
                    <div className='groupMembers'>test</div>
                </div>
                <div className='row3'>
                    <div className='textDesc'><b>Description:</b></div>
                    <div className='desc'>test</div>
                </div>
                <button className='editButton' onClick={editDesc}>Edit</button>
            </div>
            {/* ------------------------------- */}

        </div>
    )
}


export default GroupProfile

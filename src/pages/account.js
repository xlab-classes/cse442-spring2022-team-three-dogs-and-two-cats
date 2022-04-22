import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_student.module.css'
import Dropdown from "../misc/dropdown"
import axios from 'axios'
import './account.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Account = ({ name, messageNumber }) => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('') //confirm password


    //load at beginning of page, get user's info
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/account').then(
            response => {
                console.log(response.data)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setEmail(response.data.email)
                setPassword(response.data.password)
                setPassword2(response.data.password)
            }
        )
    }, [])


    //submit form
    function submitChange(event) {
        event.preventDefault()
    }


    return (
        <div className={styles['container']}>

            {/* navbar */}
            <Helmet>
                <title>Account Settings</title>
                <meta property="og:title" content="home_student - project" />
            </Helmet>
            <div className={styles['header']}>
                <span className={styles['webname']}>
                    <span>Account Settings</span>
                </span>
                <Link to="/" className={styles['navlink']}>
                    <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
                        <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
                    </svg>
                </Link>
                {/* name dropdown */}
                <span className={styles['name']}>
                    <Dropdown username={name} messageNumber={messageNumber} />
                </span>
            </div>
            {/* ------------------------------- */}

            {/* account section */}
            <form className='accountBox' onSubmit={submitChange}>
                <span className='accUsername'>{name}</span>
                First Name
                <input placeholder={firstname} />
                Last Name
                <input placeholder={lastname} />
                Email Address
                <input placeholder={email} />
                Password
                <input placeholder={password} type="password"/>
                Confirm New Password
                <input placeholder={password2} type="password"/>
                <button type="submit">Submit Change</button>
            </form>
            {/* ------------------------------- */}

        </div>
    )
}


export default Account
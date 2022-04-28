import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from './home_student.module.css'
import Dropdown from "../misc/dropdown"
import axios from 'axios'
import './account.css'

const Account = ({ name, messageNumber }) => {
    const location = useLocation()
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('') //confirm password



    //load at beginning of page, get user's info
    // server: http://128.205.32.39:5100/account
    // local:http://127.0.0.1:5000/account
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/account').then(
            response => {
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setEmail(response.data.email)
                setPassword(response.data.password)
                setPassword2(response.data.password)
            }
        )
        axios.options('http://127.0.0.1:5000/group_profile')
            .catch(err => { console.log(err) })
    }, [])


    //submit form
    function submitChange(event) {
        event.preventDefault()
        //console.log(first_name)
        //console.log(last_name)
        //console.log(email)
        console.log(password)
        console.log(password2)
        axios.post('http://127.0.0.1:5000/account', { username: name, first_name: first_name, last_name: last_name, email: email, password: password, password2: password2 }).then(
            response => {
                //console.log(response.data)
                //console.log(response.data.result)
                if (response.data.result == "Enter new email") {
                    window.alert("Email is already in use.")
                }
                if (response.data.result === 'email'){
                    window.alert("Please input a valid email address");
                }
                if (response.data.result === 'firstname'){
                    window.alert("Please input a valid first name");
                }
                else if (response.data.result === 'lastname'){
                    window.alert("Please input a valid last name");
                 }
                if (response.data.result == "passwords do not match") {
                    window.alert("Password and confirm password does not match.")
                }
                if (response.data.result == "account info updated") {
                    window.location.reload()
                }
            }
        )
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
                <input placeholder={first_name} onChange={e => setFirstName(e.target.value)} />
                Last Name
                <input placeholder={last_name} onChange={e => setLastName(e.target.value)} />
                Email Address
                <input placeholder={email} onChange={e => setEmail(e.target.value)} />
                Password
                <input placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" type="password" onChange={e => 
                    setPassword(e.target.value)} />
                Confirm New Password
                <input placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" type="password" onChange={e => setPassword2(e.target.value)} />

                <button type="submit">Submit Change</button>
            </form>
            {/* ------------------------------- */}

        </div>
    )
}


export default Account
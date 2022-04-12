import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './home_student.module.css'
import Dropdown from "../misc/dropdown"
import axios from 'axios'
import './group_profile.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import io from 'socket.io-client'
// const endPoint = "http://127.0.0.1:5000/group_profile";

// const socket = io.connect(endPoint);


const GroupProfile = () => {

    const location = useLocation()
    const name = location.state.name
    const groupname = location.state.groupname
    const group_code = location.state.groupcode
    const classcode = location.state.classcode

    const [isProf, setProf] = useState(false)


    const [sectionNum, setNum] = useState('')
    const [groupMems, setMems] = useState([])
    const [desc, setDesc] = useState('')
    const [descNew, setDescNew] = useState('')

    const [inviteShow, setInviteShow] = useState(false);

    const inviteHandleClose = () => setInviteShow(false);
    const inviteHandleShow = () => setInviteShow(true);



    //load at beginning of page
    useEffect(() => {
        console.log("-------------------------")
        console.log("GROUP CODE: " + group_code)
        console.log("CLASS CODE: " + classcode)


        axios.get('http://127.0.0.1:5000/group_profile', { params: { group_code: group_code, classcode: classcode } }).then(
            response => {
                console.log(response.data)
                setNum(response.data.section_id)
                setMems(response.data.membersList)
                setDesc(response.data.desc)
                if (response.data.isProf == 1) {
                    setProf(true)
                }
            })

        axios.options('http://127.0.0.1:5000/group_profile', { group_code: group_code, desc: descNew })
            .catch(err => { console.log(err) })
    }, [])


    function editDesc(event) {
        event.preventDefault()
        
        axios.post('http://127.0.0.1:5000/home_student').then(
            response => {
                console.log(response.data)
            })
        axios.options('http://127.0.0.1:5000/home_student')
            .catch(err => { console.log(err) })
    }


    let buttons
    if (isProf == false) {
        buttons =
            <div className='profileButtons'>
                <button className='b' onClick={inviteHandleShow}>Invite</button>
                <button className='b'>Leave the Group</button>
            </div>
    }
    else if (isProf == true) {
        buttons =
            <div className='profileButtons'>
                <button className='b'>Delete Member</button>
            </div>
    }


    const [inviteName,setInviteName] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inviteName)
        // socket.emit("SendInvitation",{inviteName:inviteName})
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
                    <div className='textID'><b>Group ID: </b>{group_code}</div>
                    <div className='textNum'><b>Section Number: </b>{sectionNum}</div>
                </div>
                <div className='row2'>
                    <div className='textGroup'><b>Group Members: </b></div>
                    <div className='groupMembers'>
                        {groupMems.map(mem =>
                            <div className='boxMembers'>
                                <span>{mem.username}</span>
                                <span>{mem.email}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='row3'>
                    <div className='textDesc'><b>Description: </b></div>
                    <div className='desc'>{desc}</div>
                </div>
                <button className='editButton' onClick={editDesc}>Edit</button>
            </div>
            {/* ------------------------------- */}


            <Modal show={inviteShow} onHide={inviteHandleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                    <Modal.Title>Invite a new member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Please enter username</Form.Label>
                        <Form.Control type="text" placeholder="Type username you want to invite here" rows={3} onChange={(e)=>{
                        setInviteName(e.target.value)}}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="outline-secondary" onClick={inviteHandleClose}>
                        Close
                    </Button>
                    <Button variant="primary"  type="submit" className = "savechangebutton" onClick={inviteHandleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>    

        </div>
    )
}


export default GroupProfile

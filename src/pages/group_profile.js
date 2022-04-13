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


export const inGroup = false

const GroupProfile = ({messageNumber}) => {

    const location = useLocation()
    const name = location.state.name
    const group_code = location.state.groupcode
    const classcode = location.state.classcode

    const [isProf, setProf] = useState(false)
    const [sectionNum, setNum] = useState('')
    const [groupMems, setMems] = useState([])
    const [desc, setDesc] = useState('')
    const [groupname, setGroupname] = useState('')
    const [isInGroup, setIsInGroup] = useState(false)

    const [inviteShow, setInviteShow] = useState(false);
    const inviteHandleClose = () => setInviteShow(false);
    const inviteHandleShow = () => setInviteShow(true);


    //load at beginning of page
    useEffect(() => {
        console.log("-------------------------")
        console.log("GROUP CODE: " + group_code)
        console.log("CLASS CODE: " + classcode)

        axios.get('http://128.205.32.39:5100/group_profile', { params: { group_code: group_code, classcode: classcode, reason: "load page" } }).then(
            response => {
                console.log(response.data)
                setNum(response.data.section_id)
                setMems(response.data.membersList)
                setDesc(response.data.desc)
                setGroupname(response.data.group_name)
                if (response.data.isProf == 1) {
                    setProf(true)
                }
                if (response.data.isInGroup == 1) {
                    setIsInGroup(true)
                }
            })

        axios.options('http://128.205.32.39:5100/group_profile')
            .catch(err => { console.log(err) })
    }, [])


    function editDesc(event) {
        event.preventDefault()

        if (event.target.desc.value != "" && isInGroup == true) {
            axios.post('http://128.205.32.39:5100/group_profile', { group_code: group_code, desc: event.target.desc.value, reason: "edit description" }).then(
                response => {
                    window.location.reload()
                })

            axios.options('http://128.205.32.39:5100/group_profile')
                .catch(err => { console.log(err) })
        }
        else if (event.target.desc.value != "" && isInGroup == false) {
            window.alert("You are not part of the group. You do not have permission to edit the description.")
        }
        else if (event.target.desc.value == "" && isInGroup == false) {
            window.alert("You are not part of the group. You do not have permission to edit the description.")
        }
        else if (event.target.desc.value == "" && isInGroup == true) {
            window.alert("Please enter a new description.")
        }
    }


    function sendInvite(e){
        e.preventDefault()
        if(!inviteName.trim())
        {
            window.alert("Please insert a username.")
        }else{
            setInviteShow(false)
            axios.post('http://128.205.32.39:5100/group_profile', {reason:'invite', usernameIn: inviteName, group: group_code}).then(
                (response)=>{
                    //Verifications
                    if(response.data.result == "404"){
                        window.alert("Please insert a valid username.")
                    }else if(response.data.result == "-1"){
                        window.alert("You must be a member of this group to send invites.")
                    }else if(response.data.result == "-2"){
                        window.alert("Users already in a group cannot be invited.")
                    }else if(response.data.result == "-3"){
                        window.alert("You cannot invite professors to groups.")
                    }else if(response.data.result == "-4"){
                        window.alert("This user already has a pending invite to this group.")
                    }else if(response.data.result == "-5"){
                        window.alert("Cannot invite to a full group.")
                    }else{
                    //User exists, insertion successful
                    window.alert("Invite sent!") 
                    }
                    
                }
            ).catch(err=>{ console.log(err) });
        }
    }


    function leaveGroup() {
        axios.get('http://128.205.32.39:5100/group_profile', { params: {
            username: name, group_code: group_code, reason: "check group"
        }}).then( response => {
            if (response.data.result === "yes") {
                const ver = confirm("Are you sure you want to leave this group?");
                if (ver) {
                    axios.post('http://128.205.32.39:5100/group_profile', {
                        username: name, group_code: group_code, reason: "leave group"
                    }).then(res => {
                        window.location.replace('/home_student');
                    })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }else{
                window.alert("You are not in this group.")
            }
        })
    }

    
    let buttons
    let homeButton
    let descForm

    if (isProf == false) {
        buttons =
            <div className='profileButtons'>
                <button className='b' onClick={inviteHandleShow}>Invite</button>
                <button onClick={function() {leaveGroup()}} className='b'>Leave the Group</button>
            </div>
        homeButton =
            <Link to="/home_student" className={styles['navlink']}>
                <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
                    <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
                </svg>
            </Link>
        descForm =
            <>
                <form className='row3' id='descForm' onSubmit={editDesc}>
                    <div className='textDesc'><b>Description: </b></div>
                    <input className='desc' type="text" placeholder={desc} name="desc"></input>
                </form>
                <button className='editButton' type='submit' form='descForm'>Edit</button>
            </>
    }
    else if (isProf == true) {
        buttons =
            <div className='profileButtons'>
                <button className='b'>Delete Member</button>
            </div>
        homeButton =
            <Link to="/home_instructor" className={styles['navlink']}>
                <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
                    <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
                </svg>
            </Link>
        descForm =
            <>
                <div className='row3'>
                    <div className='textDesc'><b>Description: </b></div>
                    <div className='desc'>{desc}</div>
                </div>
                <div className='editButton'></div>
            </>
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
                {homeButton}
                {/* name dropdown */}
                <span className={styles['name']}>
                    <Dropdown username={name} messageNumber={messageNumber}/>
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
                {descForm}
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
                    <Button variant="primary"  type="submit" className = "savechangebutton" onClick={sendInvite}>
                        Send Invite
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>    

        </div>
    )
}


export default GroupProfile

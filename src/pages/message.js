import React,{useState,useRef,Component,useEffect}  from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Dropdown from "../misc/dropdown"
import styles from './home_student.module.css'

import {Col,Row,Container, ListGroup,Button,Badge} from 'react-bootstrap'
import axios from 'axios'
import './message.css'

// const endPoint = "http://127.0.0.1:5000/message";
// http://128.205.32.39:5100/

// const socket = io.connect(endPoint);

const Message = ({name, messageNumber}) => {
    const [readList, setReadList] = useState([]);
    const [unreadList, setUnreadList] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:5000/message').then(
            res => {
                console.log(res.data)
                setReadList(res.data.readList)
                setUnreadList(res.data.unreadList)
                
            },
            err => {
                console.log(err);

            }
        )},[])

    const accept = (a) =>{
        // e.preventDefault();
        console.log(a)
        axios.post('http://127.0.0.1:5000/message',{reason:"accept",message_id:a.message_id}).then(
            (response)=>{
            if(response.data.result == 200){
                window.alert("You have joined the group successfully")
            }
            else if(response.data.result == 201){
                window.alert("You have accepted the request.")
            }
            else if(response.data.result == -1){
                window.alert("Group is full.")
            }
            else if(response.data.result == -2){
                window.alert("User has joined another group.")
            }
           else
            {   
                window.alert("404 error")
            }
              
            })
            .catch(err=>{ console.log(err)});

            setUnreadList(unreadList.filter((unreadList)=> unreadList.message_id!== a.message_id))
    }

    const decline = (d) =>{
        console.log(d)
        axios.post('http://127.0.0.1:5000/message',{reason:"decline",message_id:d.message_id}).then(
            (response)=>{
                if(response.data.result == 200){
                    window.alert("You have declined the request")
                }
                else{
                    window.alert("404 error")
                }
            })
            .catch(err=>{ console.log(err)});

            setUnreadList(unreadList.filter((unreadList)=> unreadList.message_id!== d.message_id))

    }

    const markRead = (m) =>{
        console.log(m)
        axios.post('http://127.0.0.1:5000/message',{reason:"read",message_id:m.message_id}).then(
            (response)=>{
                if(response.data.result == 200){
                    
                }
                else{
                    window.alert("404 error")
                }
            })
            .catch(err=>{ console.log(err)});
        setUnreadList(unreadList.filter((unreadList)=> unreadList.message_id!== m.message_id))
        setReadList([...readList,m])
    }

    

    return(
        <div className={styles['container']}>

            {/* navbar */}
            <Helmet>
                <title>Message</title>
                <meta property="og:title" content="home_student - project" />
            </Helmet>
            <div className={styles['header']}>
                <span className={styles['webname']}>
                    <span>Message</span>
                </span>
                <Link to="/" className={styles['navlink']}>
                    <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
                        <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
                    </svg>
                </Link>
                {/* name dropdown */}
                <span className={styles['name']}>
                    <Dropdown username={name} messageNumber = {messageNumber} />
                </span>
            </div>
                <div className={styles['center']}>
                   
            
        {unreadList.map((message)=> 
        message.is_invite ?
            (<ListGroup key ={message.message_id}>
                <ListGroup.Item className='coursesection'>
                    <Container>    
                        <Row> 
                            
                            <Col xs={6}>
                                From: {message.sender_id}
                            </Col>
                            <Col xs={2}>
                                <Button className='acceptbutton' variant="outline-success" onClick={()=>accept(message)}>Accept </Button>
                            </Col>
                            <Col>
                                <Button className='acceptbutton' variant="outline-danger" onClick={()=>decline(message)}>Decline</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>Message: {message.content}</Col>
                        </Row>
                    </Container>
                  
                    </ListGroup.Item>
                    
            </ListGroup>)
            :(
                <ListGroup key ={message.message_id}>
                <ListGroup.Item className='coursesection'>
                    <Container>    
                        <Row>   
                            <Col xs={7}>
                                From: {message.sender_id}
                            </Col>
                            <Col>
                                <Button className='readbutton' variant="outline-secondary" onClick={()=>markRead(message)}>Mark as read</Button>
                            </Col>  
                        </Row>
                        <Row>
                            <Col>Message: {message.content}</Col>
                        </Row>
                    </Container>
                    
                    </ListGroup.Item>
                    
            </ListGroup>
            
            )
        )}

        {readList.map((message)=> 
            <ListGroup key ={message.message_id}>
                {console.log(message.message_id)}
                    <ListGroup.Item className='coursesection' style={{color:'grey'}}>
                    <Container>
                        <Row> 
                            <Col xs={9}>
                                From: {message.sender_id}
                            </Col>
                            
                            <Col>
                               Read
                            </Col>
                        </Row>
                        <Row>
                            <Col>Message: {message.content}</Col>
                        </Row>
                    </Container>
                    </ListGroup.Item>
                </ListGroup>
            )} 
      
                   
 
                </div>
        </div>
    )

}

export default Message
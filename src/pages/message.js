import React,{useState,useRef,Component,useEffect}  from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Dropdown from "../misc/dropdown"
import styles from './home_student.module.css'

import {Col,Row,Container, ListGroup,Button,Badge} from 'react-bootstrap'
import axios from 'axios'

import io from 'socket.io-client'
// const endPoint = "http://127.0.0.1:5000/message";

// const socket = io.connect(endPoint);

const Message = ({name,messageNumber}) => {
    const [messages, Setmessages] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/message').then(
            res => {
                
                Setmessages()
                
            },
            err => {
                console.log(err);

            }
        )},[])

 

    return(
        <div className={styles['container']}>

            {/* navbar */}
            <Helmet>
                <title>home_student - project</title>
                <meta property="og:title" content="home_student - project" />
            </Helmet>
            <div className={styles['header']}>
                <span className={styles['webname']}>
                    <span>Message</span>
                </span>
                <Link to="/home_student" className={styles['navlink']}>
                    <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
                        <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
                    </svg>
                </Link>
                {/* name dropdown */}
                <span className={styles['name']}>
                    <Dropdown username={name} messageNumber={messageNumber}/>
                </span>
            </div>
                <div className={styles['center']}>
                    <div className={styles['coursesheader']}>   
            
            {/* {messages.map((message)=> */}
            <ListGroup>
                    <ListGroup.Item className={styles['coursesection']}>
                    <Container>
                        <Row> 
                            <Col md={7}>
                                <Badge pill bg="danger">
                                 
                                </Badge>{' '}
                                From: name
                            </Col>
                            <Col md={{ offset: 0}}>
                                <Button variant="outline-success">Accept</Button>
                            </Col>
                            <Col>
                                <Button variant="outline-danger">Decline</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>Message: hhh invite you</Col>
                        </Row>
                    </Container>
                    </ListGroup.Item>
                </ListGroup>
            {/* )} */}
      
                    </div>
 
                </div>
        </div>
    )

}

export default Message
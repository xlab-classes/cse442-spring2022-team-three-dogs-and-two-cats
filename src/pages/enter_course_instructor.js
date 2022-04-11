import React, { useState,useEffect } from 'react'
import { Link, useHistory,useLocation} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from './enter_course_instructor.module.css'

import Dropdown from "../misc/dropdown"
import ListGroup from 'react-bootstrap/ListGroup'
import { Container,Col,Row,Form, Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const EnterCourseInstructor = ({name}) => {
  let data = useLocation();
  let classCode = data.state.code

  const [groups,setGroups] = useState([]);

  const history = useHistory();

  // local path:http://127.0.0.1:5000/enter_course_instructor'
  // server path:http://128.205.32.39:5100/enter_course_instructor'

/*
  const submitHandler= (e) =>{
    e.preventDefault();
    console.log(section.length)
    console.log(groupName)
    console.log(groupSize)
    console.log(isPrivate)

    if (isPrivate == 'on'){
      setPublic(false)
    }

    axios.post('http://127.0.0.1:5000/enter_course_instructor',{name:name,section:section, groupName:groupName, groupSize:groupSize, isPublic:isPublic, classCode:classCode}).then(
      (response)=>{
        console.log(response.data.currentSize)
      group={groupName:groupName,groupSize:groupSize,groupCode:response.data.group_code,currentSize:response.data.currentSize,sectionNumber:section,isPublic:isPublic}
      setGroups([...groups,group])
      history.push({pathname:'/group_profile',state:{code:response.data.group_code}})

      })
      .catch(err=>{ console.log(err)});
      }
*/
  React.useEffect(() => {
    // set our variable to true
    let isApiSubscribed = true;

    axios.get('http://127.0.0.1:5000/enter_course_instructor',{params:{classCode:classCode}}).then(
      res => {
        if (isApiSubscribed) {
        console.log(res)
        console.log(res.data[0])
        setGroups(res.data)
        console.log(groups)
      }
    },
   err => {
      console.log(err);
   }
  )
  return () => {
    // cancel the subscription
    isApiSubscribed = false;
  };

},[])

  const Student_group_list_delete = ({group}) => {
    return(
      (<ListGroup  key={group.groupCode}>
        <ListGroup.Item className={styles['coursesection']}>
        <Container >
        <Row hidden> {group.groupCode} </Row>
        <Row >
          <Col md={7} > Group name: {group.groupName } </Col>
          <Col  md={{ span: 2, offset: 2 }}>
            <Button className = {styles['list_iterm_button']} variant="outline-secondary">Delete</Button>
          </Col>
        </Row>

        <Row xs="auto">
          <Col style={{fontSize:12}}>Group size: {group.groupSize}</Col>
          <Col style={{fontSize:12}}>Current size: {group.currentSize}</Col>
          <Col style={{fontSize:12}}>Section number: {group.sectionNumber} </Col>
        </Row>

        <Row >
          <Col style={{fontSize:13}} md={8}className={styles['listcontainer']} > Description:</Col>
        </Row>

        <Row >
          <Col style={{fontSize:13}} md={7}className={styles['listcontainer']}> {group.description}</Col>
          <Col md={{ span: 2, offset: 3 }}>
                <Link
                  to={{ 
                    pathname: "/group_profile", 
                    state: { groupcode: group.groupCode, name: name, classcode: classCode, groupname: group.groupName } 
                  }}
                  style={{ color: "grey", fontSize: 10, textDecoration: 'none' }}>
                  See more details
                </Link>
              </Col>
        </Row>

        </Container>
          </ListGroup.Item>
      </ListGroup>)
  )
}


    const group_list = groups.map((group) =>
    <Student_group_list_delete key={group.groupCode} group={group}/>
    );

  return (
    <div className={styles['container']}>
      <Helmet>
        <title>enter_course_instructor - project</title>
        <meta property="og:title" content="enter_course_instructor - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['coursename']}>
          <span>Course Name</span>
        </span>
        <Link to="/home_instructor" className={styles['navlink']}>
          <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
          </svg>
        </Link>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown username={name}/>
        </span>
    </div>
    <div className={styles['center']}>
      {group_list}
    </div>
  </div>
  )}

export default EnterCourseInstructor
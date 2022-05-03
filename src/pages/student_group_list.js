
import React from 'react'
import styles from './enter_course_student.module.css'
import ListGroup from 'react-bootstrap/ListGroup'
import { Container, Col, Row, Form, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'





const Student_group_list = ({ group, name, classcode, requestJoinHandleShow}) => {
  return (

    group.isPublic ?
      (<ListGroup key={group.groupCode}>
        <ListGroup.Item className={styles['coursesection']}>
          <Container >
            <Row hidden> {group.groupCode} </Row>
            <Row>
              <Col xs ={7} sm={7} md = {6}> Group name: {group.groupName} </Col>
              <Col xs  ="auto"sm = {{span:2 , offset:2 }} md ={{ span: 2, offset: 3 }} >
                <Button className={styles['list_iterm_button']} variant="outline-secondary" onClick={()=>requestJoinHandleShow(group.groupCode)}>Request to join</Button>
              </Col>
            </Row>

            <Row xs="auto">
              <Col style={{ fontSize: 12 }}>Group size: {group.groupSize}</Col>
              <Col style={{ fontSize: 12 }}>Current size: {group.currentSize}</Col>
              <Col style={{ fontSize: 12 }}>Section number: {group.sectionNumber} </Col>
            </Row>

            <Row xs="auto" >
              <Col style={{ fontSize: 13 }} xs ={5} className={styles['listcontainer']} > Description:</Col>
            </Row>

            <Row>
              <Col style={{ fontSize: 13 }} xs ={5} sm = {5} md = {5} className={styles['listcontainer']}> {group.description}</Col>
              <Col xs ={{ span: 4, offset: 3 }} sm = {{span:3, offset:4}} md   = {{span:2, offset:5}} className={styles['listcontainer']}>
                <Link
                  to={{ 
                    pathname: "/group_profile", 
                    state: { groupcode: group.groupCode, name: name, classcode: classcode, groupname: group.groupName } 
                  }}
                  style={{ color: "grey", fontSize: 10, textDecoration: 'none'}} >
                  See more details
                </Link>
              </Col>
            </Row>

          </Container>
        </ListGroup.Item>
      </ListGroup>)
      : (<></>)


  )
}
export default Student_group_list
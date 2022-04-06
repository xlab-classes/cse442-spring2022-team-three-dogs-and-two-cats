import React, { useState,useEffect } from 'react'
import { Link, useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from './enter_course_student.module.css'
import student_group_list from './student_group_list'
import { RiTeamLine } from 'react-icons/ri';


import Dropdown from "../misc/dropdown"
import ListGroup from 'react-bootstrap/ListGroup'
import { Container,Col,Row,Form, Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormCheck from 'react-bootstrap/FormCheck'
import axios from 'axios';


const EnterCourseStudent = ({name}) => {
  const [section, setSection] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupSize, setGroupSize] = useState(0);
  const [isPrivate, setPrivate] = useState('off');
  const [isPublic, setPublic] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groups,setGroups] = useState([]);
  var group={groupName:groupName,groupSize:groupSize,sectionNumber:section}

  const [sectionErr, setSectionErr] = useState(false)
  const [groupNameErr, setGroupNameErr] = useState(false)
  const [groupSizeErr, setGroupSizeErr] = useState(false)
  const [error, setError] = useState(false)

  const submitHandler= (e) =>{
    e.preventDefault();
    console.log(section.length)
    console.log(groupName)
    console.log(groupSize)
    console.log(isPrivate)
  
    if (isPrivate == 'on'){
      setPublic(false)
    }

    axios.post('http://127.0.0.1:5000/enter_course_student',{name:name,section:section, groupName:groupName, groupSize:groupSize,isPublic:isPublic}).then(
      (response)=>{
        console.log(response)
      group={groupName:groupName,groupSize:groupSize,groupCode:response.group_code,sectionNumber:section,isPublic:isPublic}
      console.log(group)
      setGroups([...groups,group])
        
      })
      .catch(err=>{ console.log(err)});
      }

  React.useEffect(() => {
    // set our variable to true
    let isApiSubscribed = true;

    axios.get('http://127.0.0.1:5000/enter_course_student').then(
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

    // const group_list = groups.map((group) =>
    // <student_group_list/>
    // );


    const checksection=(e)=>{
      setSection(e.target.value);
      if (e.target.value == ''){
        console.log("empty section")
        setSectionErr(true);
        setError(true);
      }
      else{
        setSectionErr(false);
        setError(false);
      }
  }

    const checkGroupName=(e)=>{
      setGroupName(e.target.value);
      if (e.target.value == ''){
        setGroupNameErr(true);
        setError(true);
      }
      else{
        setGroupNameErr(false);
        setError(false);
        
      }
  }

    const checkGroupSize=(e)=>{
      setGroupSize(e.target.value);
      if (e.target.value < 2){
        console.log("low size");
        setGroupSizeErr(true);
        setError(true);
        
      }
      else{
        setGroupSizeErr(false);
        setError(false);
        
      }
  }

  function check(){
    if (section == ''){
      console.log("empty section")
      setSectionErr(true);
      setError(true);
    }
    if (groupName == ''){
      setGroupNameErr(true);
      setError(true);
    }
    if (groupSize < 2){
      console.log("low size");
      setGroupSizeErr(true);
      setError(true);
    }
    else{
      setSectionErr(false);
      setGroupNameErr(false);
      setGroupSizeErr(false);
      setError(false);
      setShow(false);
    }

  }

  




  
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>enter_course_student - project</title>
        <meta property="og:title" content="enter_course_student - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['coursename']}>
          <span>Course Name</span>
        </span>
        <Link to="/home_student" className={styles['navlink']}>
          <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
          </svg>
        </Link>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown/>
        </span>
    </div>
  


  <div className={styles['center']}>
    <div className={styles['coursesheader']}>   
      <RiTeamLine onClick={handleShow} type="button" className={styles['createclassicon']}/>
      <span onClick={handleShow} type="button" className={styles['createclassbutton']}>
      Create a group 
      </span>
    </div>

    {/* group_list */}
    {groups.map((group) =>(
  group.isPublic?
    (<ListGroup  key={group.groupCode}>
      <ListGroup.Item className={styles['coursesection']}>
      <Container >
      <Row hidden> {group.groupCode} </Row>
      <Row >
        <Col md={7} > Group name: {group.groupName } </Col>
        <Col  md={{ span: 2, offset: 2 }}>
          <Button className = {styles['list_iterm_button']} variant="outline-secondary">Request to join</Button>
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
        <Col style={{fontSize:13}} md={7}className={styles['listcontainer']} > {group.description}</Col>
        <Col  md={{ span: 2, offset: 3 }} style={{ color:"grey",fontSize:10 }}>See more details</Col>
      </Row>  
      
      </Container>
        </ListGroup.Item>
    </ListGroup>)
    :(<></>)

    
    ))}
  
    </div>




    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submitHandler}>
        <Modal.Header style={{color:'grey'}} closeButton>
          <Modal.Title>Create a new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Section number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your section number here"
                onChange={(e)=>checksection(e)}
              />
              {sectionErr
              ?(<Form.Text style={{ color:"red" }}>
                Section cannot be empty
              </Form.Text>)
              :(<></>)
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Group name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your group name here"
                onChange={(e)=>checkGroupName(e)}
              />
            {groupNameErr
              ?(<Form.Text style={{ color:"red" }}>
                Group name cannot be empty
              </Form.Text>)
              :(<></>)
              }    

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Max group size</Form.Label>
              <Form.Control
                type="number"
                min="2"
                placeholder="Type your max group size here"
                onChange={(e)=>checkGroupSize(e)}
              />
              {groupSizeErr
              ?(<Form.Text style={{ color:"red" }}>
                Group size cannot less than 2
              </Form.Text>)
              :(<Form.Text>Please input number over than 2</Form.Text>)
              }

            </Form.Group>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Private (must request to join)"
              onChange={(e)=>setPrivate(e.target.value)}
            />
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          {error
          ?(<Button variant="outline-info"  type="submit" disabled>Save Changes</Button>)
          :(<Button variant="outline-info" type="submit"  onClick={()=>{check()}} >Save Changes</Button>)
          }
          {/* onClick={handleClose} */}
        </Modal.Footer>
        </Form>
      </Modal>


    </div>
  )
}

export default EnterCourseStudent

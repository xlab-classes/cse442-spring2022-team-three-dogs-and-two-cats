import React, { useState,useEffect } from 'react'
import { Link, useHistory,useLocation} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from './enter_course_student.module.css'
import Student_group_list from './student_group_list'
import { RiTeamLine } from 'react-icons/ri';


import Dropdown from "../misc/dropdown"
import ListGroup from 'react-bootstrap/ListGroup'
import { Container,Col,Row,Form, Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormCheck from 'react-bootstrap/FormCheck'
import axios from 'axios';



const EnterCourseStudent = ({name, messageNumber}) => {
  let data = useLocation();
  let classCode = data.state.code
  console.log(classCode);

  
  const [section, setSection] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [isPrivate, setPrivate] = useState('off');
  const [isPublic, setPublic] = useState(true);
  const [className, setClassName] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groups,setGroups] = useState([]);
  var group={groupName:groupName,groupSize:groupSize,sectionNumber:section}

  const [sectionErr, setSectionErr] = useState(false)
  const [groupNameErr, setGroupNameErr] = useState(false)
  const [groupSizeErr, setGroupSizeErr] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory();

  // local path:http://127.0.0.1:5000/enter_course_student
  // server path:http://128.205.32.39:5100/enter_course_student

  const submitHandler= (e) =>{
    e.preventDefault();
    console.log(section.length)
    console.log(groupName)
    console.log(groupSize)
    console.log(isPrivate)
    
    // if (isPrivate == 'on'){
    //   console.log(isPrivate)
    //   setPublic(false)
    //   console.log(isPublic)
    // }

    axios.post('http://128.205.32.39:5100/enter_course_student',{reason:'create',name:name,section:section, groupName:groupName, groupSize:groupSize, isPublic:isPublic, classCode:classCode}).then(
      (response)=>{
      console.log(response)
      if (response.data.result == "pass"){
        group={groupName:groupName,groupSize:groupSize,groupCode:response.data.group_code,currentSize:response.data.currentSize,sectionNumber:section,isPublic:isPublic}
        console.log(group)
        setGroups([...groups,group])
        history.push({pathname: "/group_profile", state: { groupcode: response.data.group_code, name: name, classcode: classCode }})
      }
      else{
        if (response.data.section_result == "section cannot be empty"){
          setSectionErr(true)
          setError(true)
          setShow(true)
        }
        if (response.data.group_name_result == "group name cannot be empty"){
          setGroupNameErr(true)
          setError(true)
          setShow(true)
        } 
        if (response.data.group_size_result == "group size cannot be empty"){
          setGroupSizeErr(true)
          setError(true)
          setShow(true)
        } 
        if (response.data.result == "you already in a group"){
          window.alert("You already in a group")

        }
      }
      })
      .catch(err=>{ console.log(err)});
      }

  React.useEffect(() => {
    // set our variable to true
    let isApiSubscribed = true;

    axios.get('http://128.205.32.39:5100/enter_course_student',{params:{classCode:classCode,name:name}}).then(
      res => {
        if (isApiSubscribed) {
        console.log(res)
        setGroups(res.data.response_list)
        setClassName(res.data.className)
        console.log(res.data.group_code)
        if (res.data.group_code != -1){
          history.push({pathname: "/group_profile", state: { groupcode: res.data.group_code, name: name, classcode: classCode }})
        }
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

    const [requestJoinShow, setRequestJoinShow] = useState(false);
    const [groupCode, setGroupCode] = useState('')
    const [message, setMessage] = useState('')
    const requestJoinHandleClose = () => {
      setRequestJoinShow(false);

    }
    const requestJoinHandleShow = (g) => {
      setRequestJoinShow(true);
      setGroupCode(g)
    }

    function sendMessage(e){
      e.preventDefault()
      console.log(message)
      console.log(groupCode)
      axios.post('http://128.205.32.39:5100/enter_course_student', {reason:'request', name:name, groupCode:groupCode, message:message}).then(
        (response)=>{
          if (response.data.result == '200'){
            window.alert("Sent your request successfully.")
          }else if(response.data.result == -5){
            window.alert("Group is full.")
          }
          else if(response.data.result == -4){
            window.alert("You already have a request pending.")
        }
          else{
            window.alert(response.data.result + " error") 
          }                             
        }
    ).catch(err=>{ console.log(err) });
  
    }
  
    const group_list = groups.map((group) =>
    <Student_group_list key={group.groupCode} group={group} name={name} classcode={classCode} requestJoinHandleShow={requestJoinHandleShow} />
    );
   

    const checksection=(e)=>{
      setSection(e.target.value);
      if (e.target.value == ''|| e.target.value > 65535){
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

  function checkPrivate(){
 
    if (isPrivate =='on'){
      setPublic(false);
    }
    else{
      setPublic(true);
    }
  }

  

  




  
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>{className}</title>
        <meta property="og:title" content="enter_course_student - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['coursename']}>
          <span>{className}</span>
        </span>
        <Link to="/home_student" className={styles['navlink']}>
          <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
            <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
          </svg>
        </Link>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown username={name} messageNumber ={messageNumber}/>
        </span>
    </div>
  


  <div className={styles['center']}>
    <div className={styles['coursesheader']}>   
      <RiTeamLine onClick={handleShow} type="button" className={styles['createclassicon']}/>
      <span onClick={handleShow} type="button" className={styles['createclassbutton']}>
      Create a group 
      </span>
    </div>

    {group_list} 
 
    </div>




    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submitHandler}>
      {/* <Form > */}
        <Modal.Header style={{color:'grey'}} closeButton>
          <Modal.Title>Create a new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Section number</Form.Label>
              <Form.Control
                type="number"
                max="65535"
                placeholder="Type your section number here"
                onChange={(e)=>checksection(e)}
              />
              {sectionErr
              ?(<Form.Text style={{ color:"red" }}>
                Section cannot be empty or more than 65535
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
                Group size cannot be empty or less than 2
              </Form.Text>)
              :(<Form.Text>Please input number over than 2</Form.Text>)
              }

            </Form.Group>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Private (must request to join)"
              className={styles['formCheck']}
              onChange={(e)=>setPrivate(e.target.value)}
            />
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          {error
          ?(<Button variant="outline-info"  className={styles['savechangebutton'] }  disabled>Save Changes</Button>)
          :(
          <Button variant="primary" type ="submit" className={styles['savechangebutton']} onClick={checkPrivate} >Save Changes</Button>)
          }
         
        </Modal.Footer>
        </Form>
      </Modal>


      <Modal show={requestJoinShow} onHide={requestJoinHandleClose}>
      <Form onSubmit={sendMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Request message</Modal.Title>
        </Modal.Header>
        <Modal.Body>   
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" placeholder="Leave message here" rows={3} onChange={(e)=>{setMessage(e.target.value)}} />
            </Form.Group>     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={requestJoinHandleClose}>
            Close
          </Button>
          <Button variant="primary" className={styles['savechangebutton']} type="submit" onClick={requestJoinHandleClose}>
            Send Message
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>


    </div>
  )
}

export default EnterCourseStudent
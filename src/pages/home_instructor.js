import React, { useState, useEffect } from 'react'
import { Link , useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import styles1 from 'bootstrap/dist/css/bootstrap.css';
import styles from './home_instructor.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Container, Col, Row, Form, Card, FormGroup, InputGroup, FormControl, ControlLabel} from 'react-bootstrap';

import axios from 'axios';
import ProfClass from '../misc/prof_class'



import Dropdown from "../misc/dropdown"
import { render } from 'react-dom'

const HomeInstructor = ({messageNumber}) => {

  const [classname, Setclassname] = useState('');
  const [classsize, Setclasssize] = useState('');
  const [classeslist, setClasses] = useState([]);
  const [username, setUsername] = useState('');
  // classeslist=[{'classCode':'', 'className':''}]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // local path:http://127.0.0.1:5000/home_instructor
  // server path:http://128.205.32.39:5100/home_instructor

  // sent get request when you opens the page
  useEffect(() => {
    axios.get('http://128.205.32.39:5100/home_instructor').then(
      (response) => {
        setClasses(response.data.listOut)
        setUsername(response.data.userOut)
        // console.log(response.userOut)
        // console.log(response.listOut)
        console.log(response.data.userOut)
        console.log(response.data.listOut)
      })
    .catch(err=>{ console.log(err) })
    },[])


  // call this function when you click "save changes" in the popup window

  const submitHandler= (e) =>{

    e.preventDefault();
    console.log(classname);
    console.log(classsize);
    if (!classname.trim()) {
      window.alert('Please Enter a Class Name');
    }
    //Check for the Email TextInput
    else if (!classsize.trim()) {
      window.alert('Please Enter a Class Size');
    }
    else{
      setShow(false);
      axios.post('http://128.205.32.39:5100/home_instructor',{reason: "create", classname:classname, classsize:classsize}).then(
      (response)=>{
        // sent another get request after the class is created
        axios.get('http://128.205.32.39:5100/home_instructor').then(
          (response) => {
            setClasses(response.data.listOut)
            setUsername(response.data.userOut)
          })
      })
      .catch(err=>{ console.log(err) });
    }

  }



  return (

    <>

    <div className={styles['container']}>
      <Helmet>
        <title>home_instructor - project</title>
        <meta property="og:title" content="home_instructor - project" />
      </Helmet>
      <div className={styles['header']}>
        <span className={styles['webname']}>
          <span>&lt;Webname&gt;</span>
        </span>
        <svg viewBox="0 0 1024 1024" className={styles['homebutton']}>
          <path d="M512 128c0 0-263.936 227.84-411.435 351.232-8.661 7.851-15.232 19.285-15.232 32.768 0 23.595 19.072 42.667 42.667 42.667h85.333v298.667c0 23.595 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.115 42.667-42.667v-170.667h170.667v170.667c0 23.552 19.072 42.667 42.667 42.667h128c23.595 0 42.667-19.072 42.667-42.667v-298.667h85.333c23.595 0 42.667-19.072 42.667-42.667 0-13.483-6.571-24.917-16.341-32.768-146.475-123.392-410.325-351.232-410.325-351.232z"></path>
        </svg>

        {/* name dropdown */}
        <span className={styles['name']}>
          <Dropdown username={username} messageNumber = {messageNumber}/>
        </span>
      </div>

      <div className={styles['center']}>
          <div className={styles['coursesheader']}>
            <span className={styles['yourcourses']}>Your Courses</span>
            <Button onClick={handleShow} className={styles['createclassbutton']}>
              Create New Class
            </Button>
          </div>

          <div className={styles['sort']}>
            <span className={styles['sortby']}>Sort By</span>
            <div className={styles['sortoptions']}>
              <span className={styles['newtoold']}>
                New to Old
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }} />
              </span>
            </div>
          </div>

        {/* display all classes */}
        {(classeslist|| []).map(e =>
          <ProfClass class_code={e.classCode} class_name={e.className} />
        )}

        </div>
    </div>

    {/* popup window */}
    <Modal show={show} onHide={handleClose} className={styles1}>
        <Form onSubmit={submitHandler} >
          <Modal.Header closeButton>
            <Modal.Title>Create a New Class</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your class name here"
                required
                onChange={(e) => Setclassname(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                Please enter a class name.
              </Form.Control.Feedback>

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Class Size</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Type your max class size here"
                onChange={(e) => Setclasssize(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className={styles['closebutton']} onClick={handleClose} >
              Close
            </Button>
            <Button variant="primary" type="submit" className={styles['savechangebutton']} onClick={submitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>


      </>


  )
}

export default HomeInstructor

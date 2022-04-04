import React, { useState } from 'react'
import { Link , useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from './home_instructor.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { RiTeamLine } from 'react-icons/ri';
import { Container, Col, Row, Form, Card, FormGroup, InputGroup, FormControl, ControlLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



import Dropdown from "../misc/dropdown"

const HomeInstructor = () => {

  const [classname, Setclassname] = useState('');
  const [classsize, Setclasssize] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
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
      axios.post('http://localhost:5100/home_instructor',{classname:classname, classsize:classsize}).then(
      (response)=>{
        console.log(response)
          
      })
      .catch(err=>{ console.log(err) });
    }

  }
    

  

  return (

    
    <><div className={styles['container']}>
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
          <Dropdown />
        </span>
      </div>
    
      <div className={styles['center']}>
          <div className={styles['coursesheader']}>
            <span className={styles['yourcourses']}>Your Courses</span>
            <Button onClick={handleShow} >
              <span className={styles['createclassbutton']}>Create New Class</span>
            </Button>
          </div>

          <div className={styles['sort']}>
            <span className={styles['sortby']}>Sory By</span>
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

          <div className={styles['coursesection']}>
            <div className={styles['course']}>
              <span className={styles['coursename']}>Course Name</span>
              <Link to="/enter_course_instructor" className={styles['navlink']}>
                <div className={styles['enterbutton']}>
                  <span className={styles['enter']}>Enter</span>
                </div>
              </Link>
              <div className={styles['deletebutton']}>
                <span className={styles['delete']}>Delete</span>
              </div>
            </div>
            <span className={styles['code']}>Code: ######</span>
          </div>

          
        </div>
    </div>
    <Modal show={show} onHide={handleClose}>
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
            <Button variant="secondary" onClick={handleClose} >
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      
      </>


    
    


  )
}

export default HomeInstructor
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../pages/home_instructor.module.css'
import axios, { Axios } from 'axios';




const ProfClass = (props) => {
    const [show, setShow] = React.useState(true)

    const deleteClass= (e)=>{
        //e.preventDefault();
        if(window.confirm("Are you sure you want to delete " + props.class_name +"? This cannot be undone."))
        // http://128.205.32.39:5100/
        // http://127.0.0.1:5000/
        axios.post("http://127.0.0.1:5000/home_instructor", {reason: "delete", classCode : props.class_code}).then(
            (response) =>{
                if(response.data.result == 200){
                    setShow(false)
                    window.alert("Class deleted succesfully.    ")
               
                }
            }

        )
    }

    return (
      
        
        <div>
             {show &&
        <div className={styles['coursesection']}>
        
           
            <div className={styles['course']}>

                <span className={styles['coursename']}>{props.class_name}</span>
                <Link to={{pathname:"/enter_course_instructor", state:{code:props.class_code}}}>
                    <div className={styles['enterbutton']}>
                        <span className={styles['enter']}>Enter</span>
                    </div>
                </Link>
                <div className={styles['deletebutton']}>
                    <span onClick={deleteClass} className={styles['delete']}>Delete</span>
                </div>  
            </div>
            
            
        
            <span className={styles['code']}>Code: {props.class_code}</span>
        
        </div>
    }
        </div>
        
      
    )
}


export default ProfClass
import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Switch,BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';

import './style.module.css'
import EnterCourseInstructor from './pages/enter_course_instructor'
import ResetPassword from './pages/reset_password'
import RetrieveUsername from './pages/retrieve_username'
import HomeInstructor from './pages/home_instructor'
import HomeLogin from './pages/home_login'
import EnterCourseStudent from './pages/enter_course_student'
import HomeStudent from './pages/home_student'
import SignUp from './pages/sign_up'

const App = () => {
  const [name,setName] = useState('');
  useEffect(() => {
    axios.get('/').then(
      res => {
        console.log("This is the get request from login \n",res)
        setName(res.data.username)
      },
      err => {
        console.log(err);
        setName('')
      })
    },[])

  return (
    <Router>
      <div>
        {name ?(
        <Switch>
        <Route exact component={EnterCourseInstructor} path="/enter_course_instructor" />
        <Route exact component={ResetPassword} path="/reset_password" />
        <Route exact component={RetrieveUsername} path="/retrieve_username" />
        <Route exact component={HomeInstructor} path="/home_instructor" />
        <Route exact component={HomeLogin} path="/" />
        <Route exact component={EnterCourseStudent} path="/enter_course_student" />
        <Route exact component={HomeStudent} path="/home_student" />
        <Route exact component={SignUp} path="/sign_up" />
        </Switch> )
        :(   
        <Switch>
          <Route exact component={EnterCourseInstructor} path="/enter_course_instructor" />
          <Route exact component={ResetPassword} path="/reset_password" />
          <Route exact component={RetrieveUsername} path="/retrieve_username" />
          <Route exact component={HomeInstructor} path="/home_instructor" />
          <Route exact component={HomeLogin} path="/" />
          <Route exact component={EnterCourseStudent} path="/enter_course_student" />
          <Route exact component={HomeStudent} path="/home_student" />
          <Route exact component={SignUp} path="/sign_up" />
        </Switch> )
    }
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

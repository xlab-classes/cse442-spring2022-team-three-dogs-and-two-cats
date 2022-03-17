import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
  return (
    <Router>
      <div>
        <Route
          exact
          component={EnterCourseInstructor}
          path="/enter_course_instructor"
        />
        <Route exact component={ResetPassword} path="/reset_password" />
        <Route exact component={RetrieveUsername} path="/retrieve_username" />
        <Route exact component={HomeInstructor} path="/home_instructor" />
        <Route exact component={HomeLogin} path="/" />
        <Route
          exact
          component={EnterCourseStudent}
          path="/enter_course_student"
        />
        <Route exact component={HomeStudent} path="/home_student" />
        <Route exact component={SignUp} path="/sign_up" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

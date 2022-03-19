import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Switch,BrowserRouter as Router, Route,useHistory,Redirect } from 'react-router-dom'
import { browserHistory } from 'react-router'
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


axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const App = () => {
  const [name,setName] = useState('');
  const [token, setToken] = useState(false);
  const [professor, setProfessor] = useState(false);
  const history = useHistory();
  
  
  useEffect(() => {
    axios.get('http://128.205.32.39:5100/').then(
      res => {
        console.log("This is the get request from login \n",res)
        console.log(localStorage.getItem('token'))
        // if (localStorage.getItem('token')){
        //   setToken(true)
        //   if (res.data.result == "Professor"){
        //     setProfessor(true)
        //     console.log(professor)
            
        //   }
        //   else{
        //     setProfessor(false)
        //     console.log(professor)
        //   }  
        // }   
        if (res.data.result == "Professor"){
          setProfessor(true)
          setToken(true)
        }
        else if (res.data.result == "Student"){
          setProfessor(false)
          setToken(true)
        }
        else{
          setToken(false)
        }
       
      },
      err => {
        console.log(err);
        setName('')
      })
    },[])

  
  return (
    <Router>
    <div>
      {token ?(
          <Switch>
            {(professor)?(
              <Switch>  
                <Route exact component={EnterCourseInstructor} path="/enter_course_instructor" />
                <Route exact component={ResetPassword} path="/reset_password" />
                <Route exact component={RetrieveUsername} path="/retrieve_username" />
                <Redirect exact from="/" to="/home_instructor" />
                {/* <Route exact component={HomeLogin} path="/">
                  <Redirect push to="/home_instructor" />
                </Route> */}
                <Route exact component={HomeInstructor} path="/home_instructor" />
              </Switch>)
              

            :(
              <Switch>
                {console.log(professor)}  
                <Route exact component={ResetPassword} path="/reset_password" />
                <Route exact component={RetrieveUsername} path="/retrieve_username" />
                {console.log("student" + professor)}
                <Route exact component={HomeStudent} path="/home_student" />
                <Redirect exact from="/" to="/home_student" />
                {/* <Route exact component={HomeLogin} path="/"> */}
                  {/* <Redirect push to="/home_student" /> */}

                  {/* <Redirect to="/home_student" /> */}
                {/* </Route> */}
                <Route exact component={EnterCourseStudent} path="/enter_course_student" />
                <Route exact component={SignUp} path="/sign_up" />
                </Switch>)
          }
          {/* {console.log("professor is true "+ professor)} */}
          </Switch>
     )
      :(   
      <Switch>
        <Route exact component={HomeLogin} path="/"/>
        <Route exact component={SignUp} path="/sign_up" />
      </Switch> )
  }
    </div>
  </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
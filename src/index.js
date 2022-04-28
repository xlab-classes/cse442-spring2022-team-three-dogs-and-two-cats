import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Switch,BrowserRouter as Router, Route,useHistory,Redirect } from 'react-router-dom'
import { browserHistory } from 'react-router'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


import './style.module.css'
import EnterCourseInstructor from './pages/enter_course_instructor'
import ResetPassword from './pages/reset_password'
import RetrieveUsername from './pages/retrieve_username'
import HomeInstructor from './pages/home_instructor'
import HomeLogin from './pages/home_login'
import EnterCourseStudent from './pages/enter_course_student'
import HomeStudent from './pages/home_student'
import SignUp from './pages/sign_up'
import GroupProfile from './pages/group_profile'
import Message from './pages/message'
import Account from './pages/account'

const App = () => {
  const [name,setName] = useState('');
  const [token, setToken] = useState(false);
  const [professor, setProfessor] = useState(false);
  const [messageNumber, setMessageNumber] = useState(1);
  const history = useHistory();
  
  
  useEffect(() => {
     axios.get('http://127.0.0.1:5000/').then(
    //  axios.get('http://128.205.32.39:5100/ ').then(
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
          setName(res.data.username)
          setMessageNumber(res.data.message_number)
          
        }
        else if (res.data.result == "Student"){
          setProfessor(false)
          setToken(true)
          setName(res.data.username)
          setMessageNumber(res.data.message_number)

          console.log(messageNumber)
        }
        else{
          setToken(false)
        }
        setName(res.data.username)
        console.log(res.data.username)
       
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
                <Route exact path="/enter_course_instructor" component={()=><EnterCourseInstructor name={name} messageNumber={messageNumber}/>} />
                <Route exact path='/group_profile' component = {GroupProfile} />
                <Route exact component={ResetPassword} path="/reset_password" />
                <Route exact component={RetrieveUsername} path="/retrieve_username" />
                <Redirect exact from="/" to="/home_instructor" />
                <Route exact path="/home_instructor" component={()=><HomeInstructor messageNumber={messageNumber} />}/>
                <Route exact path='/group_profile' component={()=><GroupProfile messageNumber={messageNumber} />} />
                <Route exact  path="/message" component={()=><Message name={name} messageNumber={messageNumber}/>} />
                <Route exact path='/account' component={()=><Account name={name} messageNumber={messageNumber} />} />
              </Switch>)
              

            :(
              <Switch>
                <Route exact path="/home_student" component={()=><HomeStudent messageNumber={messageNumber} />}/>
                <Redirect exact from="/" to="/home_student" />
                <Route exact path="/enter_course_student" component={()=><EnterCourseStudent name={name} messageNumber={messageNumber}/>} />
                <Route exact path='/group_profile' component={()=><GroupProfile messageNumber={messageNumber} />} />
                <Route exact  path="/message" component={()=><Message name={name} messageNumber={messageNumber}/>} />
                <Route exact path='/account' component={()=><Account name={name} messageNumber={messageNumber} />} />
                </Switch>)
          }
          
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
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

ReactDOM.render(<App />, document.getElementById('app'))



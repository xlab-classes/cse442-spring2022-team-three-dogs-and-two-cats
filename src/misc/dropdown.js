import React from 'react'
import axios from 'axios';
import '../misc/dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'

const name_dropdown = (props) => {
  
  const [visible, setVisible] = React.useState(false)
  const [msgCount, setCount] = React.useState(0)
  const [msgVisable, setMsgVisable] = React.useState(false)
  const [alreadyRan, setAlreadyRan] = React.useState(false)

   // sent get request when you opens the page
   React.useEffect(() => {
   
    axios.get('http://127.0.0.1:5000/message', {params: {reason :"count"}}).then(
    (response) => {
     setCount(response.data.count)
      if (msgCount > 0)
        setMsgVisable(true)
    })
  
  }, []);
  
  const logout =()=>{
    console.log("Logout")
    localStorage.clear()
    }

   

    
  
  return (
    <div className='dropdown_container'>
      
      <button type="button" className="name" onClick={() => setVisible(!visible)}>
        {props.username}
        <Badge pill bg="danger">
           {msgVisable && msgCount}
        </Badge>{' '}

      </button>
      
      {visible &&
      <div className="dropdownMenu">
      
          <Dropdown>
              <Dropdown.Item >Account Settings</Dropdown.Item>
              <Dropdown.Item href="/message">Messages  
                <Badge pill bg="danger">
                {msgVisable && msgCount}
                </Badge>{' '}
              </Dropdown.Item>
              <Dropdown.Item href="/" onClick={logout}>Log Out</Dropdown.Item>    
          </Dropdown>
   
      </div>
      }

    </div>
  )
}

export default name_dropdown
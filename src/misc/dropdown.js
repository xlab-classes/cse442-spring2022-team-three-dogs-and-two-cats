import React from 'react'
import '../misc/dropdown.css'
import ListGroup from 'react-bootstrap/ListGroup'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'

const name_dropdown = () => {
  const [visible, setVisible] = React.useState(false)
  const logout =()=>{
    console.log("Logout")
    localStorage.clear()
    }

  
  return (
    <div className='dropdown_container'>
      
      <button type="button" className="name" onClick={() => setVisible(!visible)}>
        Name
      </button>
      
      {visible &&
      <div className="dropdown">
       

          <Dropdown>
              <Dropdown.Item action >Account Settings</Dropdown.Item>
              <Dropdown.Item action >Messages </Dropdown.Item>
              <Dropdown.Item action  href="/"  className="logout" onClick={logout}>Log Out</Dropdown.Item>    
          </Dropdown>
   
        
        {/* <ul>
          <li>Account Settings</li>
          <li>Messages</li>
          <a href="/">
            <li onClick={logout} className="logout">Log Out</li>
          </a>
        </ul> */}
      </div>
      }

    </div>
  )
}

export default name_dropdown
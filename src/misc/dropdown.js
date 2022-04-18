import React from 'react'
import axios from 'axios';
import '../misc/dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'

const name_dropdown = (props) => {
  
  const [visible, setVisible] = React.useState(false)

  
  const logout =()=>{
    console.log("Logout")
    localStorage.clear()
    }
   

    
  
  return (
    <div className='dropdown_container'>
      
      <button type="button" className="name" onClick={() => setVisible(!visible)}>
        {props.username}
        <Badge pill bg="danger">
           {props.messageNumber>0 && props.messageNumber}
        </Badge>{' '}

      </button>
      
      {visible &&
      <div className="dropdownMenu">
      
          <Dropdown>
              <Dropdown.Item >Account Settings</Dropdown.Item>
              <Dropdown.Item href="/message">Messages  
                <Badge pill bg="danger">
                {props.messageNumber > 0 && props.messageNumber}
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
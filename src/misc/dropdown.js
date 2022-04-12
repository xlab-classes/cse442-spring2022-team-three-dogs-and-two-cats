import React from 'react'
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

        {props.messageNumber > 0 
        ?(<Badge pill bg="danger">
          {props.messageNumber}
        </Badge>)
        :(<></>)
        }

      </button>
      
      {visible &&
      <div className="dropdownMenu">
      
          <Dropdown>
              <Dropdown.Item >Account Settings</Dropdown.Item>
              <Dropdown.Item href="/message">Messages  
              {props.messageNumber > 0 
              ?(<Badge pill bg="danger">
                {props.messageNumber}
              </Badge>)
              :(<></>)
              }
              </Dropdown.Item>
              <Dropdown.Item href="/" onClick={logout}>Log Out</Dropdown.Item>    
          </Dropdown>
   
      </div>
      }

    </div>
  )
}

export default name_dropdown
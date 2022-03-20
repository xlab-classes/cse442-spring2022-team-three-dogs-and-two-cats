import React from 'react'
import '../misc/dropdown.css'

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
        <ul>
          <li>Account Settings</li>
          <li>Messages</li>
          <a href="/">
            <li onClick={logout} className="logout">Log Out</li>
          </a>
        </ul>
      </div>
      }

    </div>
  )
}

export default name_dropdown
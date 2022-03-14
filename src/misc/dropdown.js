import React from 'react'
import '../misc/dropdown.css'

const name_dropdown = () => {
  const [visible, setVisible] = React.useState(false)
  
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
          <li className="logout"><a href="/">Log Out</a></li>
        </ul>
      </div>
      }

    </div>
  )
}

export default name_dropdown
import React from 'react'
import CurrentUserName from './CurrentUserName'
import NavMenu from './NavMenu'

export default function Sidebar (props) {
  return (
    <div className='sidenav'>
      <CurrentUserName cUser={props.cUser} />
      <NavMenu 
        cUser={props.cUser} 
        goBackHandler={props.goBackHandler} 
        onHandleLogout={props.handleLogout} 
        onHandleDelete={props.handleDelete} />
      {props.cUser ? null : 
        <ul className='sample-info'>
          <li><b>Sample Users:</b></li>
          <li>kimberlee@gmail.com</li>
          <li>victoria@gmail.com</li>
          <li>will@gmail.com</li>
          <li>myung@gmail.com</li>
          <li>jacques@gmail.com</li>
        </ul>
      }
    </div>
  )
}

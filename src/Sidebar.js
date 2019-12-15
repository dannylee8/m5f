import React from 'react'
import CurrentUserName from './CurrentUserName'
import NavMenu from './NavMenu'

export default function Sidebar (props) {
  // console.log(props)
  return (
    <div className='sidenav'>
      <CurrentUserName cUser={props.cUser} />
      <NavMenu cUser={props.cUser} handleLogout={props.handleLogout} handleDelete={props.handleDelete} />
    </div>
  )
}

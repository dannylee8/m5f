import React from 'react'
import { Link, Route } from 'react-router-dom'

const NavMenu = props => {
  return (
    (props.cUser)
      ? (
        <>
          <nav>
            <ul>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link onClick={()=> {props.goBackHandler()}} to='/teams'>Teams</Link>
              </li>
              <li>
                <Link to='/search'>Search</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/profile" render={() => (
            <button id='delete' onClick={props.onHandleDelete} className='btn btn-warning btn-sm'>
            delete user
            </button>
          )} />
          <button id='logout' onClick={props.onHandleLogout} className='btn btn-primary btn-sm'>
          logout
          </button>
          
        </>)
      : ''
  )
}

export default NavMenu

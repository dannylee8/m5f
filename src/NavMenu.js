import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = props => {
	return(
		(props.cUser) 
		? 
		(<>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/profile'>Profile</Link>
					</li>
					<li>
						<Link to='/teams'>Teams</Link>
					</li>
					<li>
						<Link to='/search'>Search</Link>
					</li>
				</ul>
			</nav>
			<button id='logout' onClick={props.handleLogout} className='btn btn-primary btn-lg btn-block'>
        logout
      </button>
		</>) 
		: 
		""
	)
}

export default NavMenu

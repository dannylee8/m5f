import React, { Component } from 'react'
import UserRoles from './UserRoles'
import ProfileIcon from './icons/001-bear.png'

class Profile extends Component {
  render () {
    return (
      <div>
        <img className='profile-img' alt='profile placeholder' src={ProfileIcon} />
        <table className='user-table'>
          <tbody>
            <tr>
              <td className='cUser'>Name:</td>
              <td className='cUser'>{(this.props.state.current_user) ? `${this.props.state.current_user.name}` : '!'}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{(this.props.state.current_user) ? `${this.props.state.current_user.email_address}` : '!'}</td>
            </tr>
          </tbody>
        </table>
        <UserRoles currentUserRoles={this.props.state.current_user_roles} />
      </div>
    )
  }
}

export default Profile

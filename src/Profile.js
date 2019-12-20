import React, { Component } from 'react'
import UserRoles from './UserRoles'
import ProfileIcon from './icons/001-bear.png'

class Profile extends Component {
  render () {
    // console.log(this.props.state.current_user_roles)
    return (
      <div className='profile-container'>
        <div>
          <img className='profile-img' alt='profile placeholder' src={ProfileIcon} />
        </div>
        <div className='profile-content'>
          <div className='left-column'>
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
            <UserRoles handleDeleteUserRole={this.props.handleDeleteUserRole} currentUserRoles={this.props.findUserRoles(this.props.state.current_user.id)} />
          </div>
          <div className='right-column'>
            <table className='roles-table'>
              <tbody>
                <tr>
                  <th />
                  <th>Roles:</th>
                  <th>Years Exp:</th>
                </tr>
                <tr>
                  <td>
                    <div className='custom-control custom-checkbox'>
                      <input type='checkbox' className='custom-control-input' id='defaultUnchecked'  />
                      <label className='custom-control-label' htmlFor='defaultUnchecked'>Default unchecked</label>
                    </div>
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>
                    <div className='custom-control custom-checkbox'>
                      <input type='checkbox' className='custom-control-input' id='defaultUnchecked2' />
                      <label className='custom-control-label' htmlFor='defaultUnchecked2' />
                    </div>
                  </td>
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile

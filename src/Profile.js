import React, { Component } from 'react'

class Profile extends Component {

  render () {
    return (
      <div>
        <table className='user-table'>
          <tr>
            <td>Name:</td>
            <td>{(this.props.state.current_user) ? `${this.props.state.current_user.name}` : '!'}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{(this.props.state.current_user) ? `${this.props.state.current_user.email_address}` : '!'}</td>
          </tr>
        </table>

      </div>
    )
  }
}

export default Profile

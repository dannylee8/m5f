import React, { Component } from 'react'

class Profile extends Component {

  render () {
    // console.log('Profile: ', this.props.state)
    return (
      <div>
        <h4>Name: {(this.props.state.current_user) ? `${this.props.state.current_user.name}` : '!'}</h4>
      </div>
    )
  }
}

export default Profile

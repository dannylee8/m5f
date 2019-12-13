import React from 'react'

const Profile = props => (
  <div>
    <h1>Hello{(props.current_user) ? `, ${props.current_user.name}` : '!'}</h1>
  </div>
)

export default Profile

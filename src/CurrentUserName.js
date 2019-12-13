import React from 'react'

const CurrentUserName = props => (
  <div id='cUser'>
    {(props.cUser) ? `${props.cUser.name} 😀` : '😀'}
  </div>
)

export default CurrentUserName

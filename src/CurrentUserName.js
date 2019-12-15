import React from 'react'

const CurrentUserName = props => (
  <div className='cUser'>
    {(props.cUser) ? `${props.cUser.name} 😀` : '😀'}
  </div>
)

export default CurrentUserName

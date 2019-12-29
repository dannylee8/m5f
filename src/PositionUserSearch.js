import React from 'react'
import { useLocation } from 'react-router-dom'

const PositionUserSearch = props => {
  const location = useLocation()

  return (
    <div>
      {console.log(location.singlePosition)}
      <h1>Hello</h1>
    </div>
  )
}

export default PositionUserSearch

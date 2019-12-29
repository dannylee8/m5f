import React from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'

const PositionRowName = props => {
  return (
    <td className='position-user-search'>
      <Tooltip title='Find a user with this skill' arrow>
        <Link to='position-user-search'>Position not filled</Link>
      </Tooltip>
    </td>
  )
}

export default PositionRowName

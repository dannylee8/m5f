import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

const onClickHandler = (singleRole, singlePosition, updatePositionsUser) => {
  console.log("singleRole", singleRole)
  console.log("singlePosition", singlePosition)
  console.log(updatePositionsUser)
  updatePositionsUser(singlePosition.id, singleRole.user_id)
}

const PositionUserSearchSingle = ({ singleRole, singlePosition, findUserByID, updatePositionsUser }) => (
  <tr>
    <td>{findUserByID(singleRole.user_id).name}</td>
    <td className='centered'>{singleRole.years_exp}</td>
    <td className='centered'>            
      <Tooltip title="Add user">
        <i onClick={() => onClickHandler(singleRole, singlePosition, updatePositionsUser)} className='material-icons-outlined'>add</i>
      </Tooltip>
    </td>
  </tr>
)

export default PositionUserSearchSingle

import React from 'react'

const PositionRowName = props => (
  <td>
    {(props.findUserByID(props.singlePosition.user_id)) ? 
      props.findUserByID(props.singlePosition.user_id).name
      :
      "---"}
  </td>
)

export default PositionRowName

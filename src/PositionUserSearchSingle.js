import React from 'react'

const PositionUserSearchSingle = ({ singleRole, findUserByID }) => (
  <tr>
    <td>{findUserByID(singleRole.user_id).name}</td>
    <td className='centered'>{singleRole.years_exp}</td>
  </tr>
)

export default PositionUserSearchSingle

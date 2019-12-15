import React from 'react'

const UserRole = props => (
  <>
		{/* {console.log("userRole.js: ", props.singleRole)} */}
    <tr>
      <td>{props.singleRole.name}</td>
      <td>{props.singleRole.years_exp}</td>
    </tr>
  </>
)

export default UserRole

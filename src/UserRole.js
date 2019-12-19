import React from 'react'

const UserRole = props => (
  <>
    {console.log('userRole.js: ', props.singleRole)}
    <tr>
      <td>{props.singleRole.name}</td>
      <td>{props.singleRole.years_exp}</td>
      <td>
        <i className='material-icons'>edit</i>
        <i onClick={()=>props.handleDeleteUserRole(props.singleRole)} className='material-icons'>delete</i>
      </td>
    </tr>
  </>
)

export default UserRole

import React from 'react'
import UserRole from './UserRole'

const hasRoles = (props) => {
  return (
    <div>
      <table className='roles-table'>
        <tbody>
          <tr>
            <th width='55%'>Current Roles</th>
            <th width='23%'>Yrs. exp.</th>
            <th width='22%' />
          </tr>
          {props.currentUserRoles.map(role => {
            return <UserRole key={role.id} onHandleDeleteUserRole={props.onHandleDeleteUserRole} singleRole={role} />
          })}
        </tbody>
      </table>
    </div>
  )
}

const hasNoRoles = () => {
  return (
    <div>
      <table className='roles-table'>
        <tbody>
          <tr>
            <th>Role</th>
            <th>Yrs. Exp.</th>
          </tr>
          <tr>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const UserRoles = props => (
  <div>
    {/* {console.log("state, ln 5, userRoles.js: ", props.currentUserRoles.length > 0 ? "true" : "false")} */}
    {props.currentUserRoles.length > 0 ? hasRoles(props) : hasNoRoles()}
  </div>
)

export default UserRoles

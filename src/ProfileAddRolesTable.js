import React from 'react'
import ShowAllRoles from './ShowAllRoles'

const ProfileAddRolesTable = props => (
  <>
    <table className='roles-table'>
      <tbody>
        <tr>
          <th />
          <th>Roles:</th>
          <th>Years Exp:</th>
        </tr>
        <tr>

          <ShowAllRoles />
					
        </tr>
      </tbody>
    </table>
  </>
)

export default ProfileAddRolesTable

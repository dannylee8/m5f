import React from 'react'
import ProfileAddRolesTableCheckbox from './ProfileAddRolesTableCheckbox'

const ProfileAddRolesTable = props => (
  <>
    <table className='roles-table'>
      <tbody>
        <tr>
          <th />
          <th>Roles:</th>
          <th>Years Exp:</th>
        </tr>

        <ProfileAddRolesTableCheckbox />

      </tbody>
    </table>
  </>
)

export default ProfileAddRolesTable

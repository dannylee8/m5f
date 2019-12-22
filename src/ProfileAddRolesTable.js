import React from 'react'
import CheckboxGroupProfile from './CheckboxGroupProfile'

const ProfileAddRolesTable = props => (
  <>
    <table className='roles-table'>
      <tbody>
        <tr>
          <CheckboxGroupProfile
            isSelected={props.isSelected}
            roleOptions={props.roleOptions}
            onCheckboxChange={props.onCheckboxChange}
            onInputChange={props.onInputChange}
            onYrsExpChange={props.onYrsExpChange}
            state={props.state}
            queryCurrentUser={props.queryCurrentUser}
            queryCurrentUserRoles={props.queryCurrentUserRoles}
          />
        </tr>
      </tbody>
    </table>
  </>
)

export default ProfileAddRolesTable

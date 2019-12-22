import React from 'react'
import CheckboxGroupProfile from './CheckboxGroupProfile'

const ProfileAddRolesTable = props => (
  <>
    <table className='roles-table'>
      <tbody>
        <tr>
					{console.log(props.queryCurrentUserRoles())}
          <CheckboxGroupProfile
            isSelected={props.isSelected}
            roleOptions={props.roleOptions}
            onCheckboxChange={props.onCheckboxChange}
            onInputChange={props.onInputChange}
            onYrsExpChange={props.onYrsExpChange}
            state={props.state}
          />
        </tr>
      </tbody>
    </table>
  </>
)

export default ProfileAddRolesTable

import React from 'react'
import Checkbox from './Checkbox'

const createCheckbox = (props, roleOption) => {
  return (
    <tr key={roleOption}>
			{/* {console.log(props)} */}
      <td>
        <Checkbox
          label={roleOption}
          isSelected={props.isSelected(roleOption)}
          onCheckboxChange={props.onCheckboxChange}
          key={roleOption}
        />
      </td>
    </tr>
  )
}

const CheckboxGroup = (props) => {
  console.log(props)
  return (
    <div>
      <table className='new-user-table'>
        <tbody>
          {props.roleOptions.map((roleOption) => createCheckbox(props, roleOption))}
        </tbody>
      </table>
    </div>
  )
}

export default CheckboxGroup

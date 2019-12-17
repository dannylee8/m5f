import React from 'react'
import Checkbox from './Checkbox'

const createCheckbox = (props, roleOption) => {
  return (
    <tr key={roleOption}>
      {console.log(props.isSelected(roleOption))}
      <td>
        <Checkbox
          label={roleOption}
          isSelected={props.isSelected(roleOption)}
          onCheckboxChange={props.onCheckboxChange}
          key={roleOption}
        />
      </td>
      <td>
        {props.isSelected(roleOption) ? (
          <input type='text' id='years-exp' name={roleOption} required length='2' size='2' />
        ) : (
          null
        )}
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
          <tr>
            <th>Role</th>
            <th>Yrs. Exp</th>
          </tr>
          {props.roleOptions.map((roleOption) => createCheckbox(props, roleOption))}
        </tbody>
      </table>
    </div>
  )
}

export default CheckboxGroup

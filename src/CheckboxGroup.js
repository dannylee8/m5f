import React from 'react'
import Checkbox from './Checkbox'

const createCheckbox = (props, roleOption) => {
  return (
    <tr key={roleOption}>
      {console.log(props.state)}
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
          <input type='number' value={props.state.roleOption} onChange={props.onInputChange} className='years-exp' name={roleOption+"_yrs_exp"} step="1" min="0" max="50" required pattern="\d*" length='2' size='2' />
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

import React from 'react'
import Checkbox from './Checkbox'
import { Input } from 'reactstrap';

const createCheckbox = (props, roleOption) => {
  return (
    <tr key={roleOption} className="">
      {/* {console.log(props.state)} */}
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
          <Input  type='number' 
                  value={props.state.yrsExp}
                  onChange={props.onYrsExpChange} 
                  className='years-exp' 
                  name={roleOption} 
                  step="1" min="0" max="50" 
                  required pattern="\d*" 
                  length='2' size='2' />
        ) : (
          null
        )}
      </td>
    </tr>
  )
}

const CheckboxGroupProfile = (props) => {
  return (
    <>
      <tr>
        <th width='75%'>Role</th>
        <th width='25%'>Yrs. Exp</th>
      </tr>
      {props.filterRoleOptions().map((roleOption) => createCheckbox(props, roleOption))}
    </>
  )
}

export default CheckboxGroupProfile

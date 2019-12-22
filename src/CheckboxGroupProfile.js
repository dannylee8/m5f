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
                  value={props.state.yrsExp.roleOption} 
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
  // console.log(props)
  return (
    <div>
      <table className='new-user-table'>
        <tbody>
          <tr>
            <th>Role</th>
            <th>Yrs. Exp</th>
          </tr>
          {props.roleOptions.map((roleOption) => { 

            return createCheckbox(props, roleOption)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CheckboxGroupProfile

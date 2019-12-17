import React from 'react'

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className='form-check'>
  {/* {console.log(onCheckboxChange)} */}
    <label>
      <input
        type='checkbox'
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className='form-check-input'
      />
      {label}
    </label>
  </div>
)

export default Checkbox

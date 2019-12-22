import React from 'react'

const ShowAllRoles = props => (
  <>
    <td>
      <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' id='defaultUnchecked' />
        <label className='custom-control-label' htmlFor='defaultUnchecked'>Default unchecked</label>
      </div>
    </td>
    <td>
			rolename
    </td>
    <td>
			yrs
    </td>
  </>
)

export default ShowAllRoles

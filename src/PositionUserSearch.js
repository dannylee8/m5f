import React from 'react'
import { useLocation, Redirect, Link } from 'react-router-dom'
import PositionUserSearchSingle from './PositionUserSearchSingle'
const uuidv4 = require('uuid/v4')

const PositionUserSearch = props => {
  const location = useLocation()
  if (!location.singlePosition) {
    return <Redirect to='/teams' />
  } else {
    return (
      <>
        <h2 className='fade-in'>
          Team: <span className='bold yellow'>{props.getTeamById(location.singlePosition.team_id).name}</span>
        </h2>
        <h2>
          Searching for: <span className='bold green'>{location.singlePosition.name}</span>
        </h2>
        <h6>
          <Link to='/teams'>[back]</Link>
        </h6>
        <div className='test-box'>
          <table className='position-user-search-table fade-in'>
            <thead>
              <tr>
                <th width='60%'>Name</th>
                <th width='20%' className='centered'>Years Exp.</th>
                <th width='20%' className='centered'>Add</th>
              </tr>
            </thead>
            <tbody>
              {props.listMatchingUserRoles(location.singlePosition.role_id).map(
                (singleRole) =>
                  <PositionUserSearchSingle
                    key={uuidv4()}
                    singleRole={singleRole}
                    findUserByID={props.findUserByID}
                    updatePositionsUser={props.updatePositionsUser}
                    singlePosition={location.singlePosition}
                  />
              )}
            </tbody>
          </table>
        </div>  

      </>
    )
  }
}

export default PositionUserSearch

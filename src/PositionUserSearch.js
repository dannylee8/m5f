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
        <h6 className='fade-in'>
          Team: {props.getTeamById(location.singlePosition.team_id).name}
        </h6>
        <h6>
          Searching for: {location.singlePosition.name}
        </h6>
        <h6>
          <Link to='/teams'>[back]</Link>
        </h6>
        <table className='position-user-search-table fade-in'>
          <thead>
            <tr>
              <th width='60%'>Name</th>
              <th className='centered' width='40%'>Years Exp.</th>
            </tr>
          </thead>
          <tbody>
            {props.listMatchingUserRoles(location.singlePosition.role_id).map(
              (singleRole) =>
                <PositionUserSearchSingle
                  key={uuidv4()}
                  singleRole={singleRole}
                  findUserByID={props.findUserByID}
                />
            )}
          </tbody>
        </table>
      </>
    )
  }
}

export default PositionUserSearch

import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

const uuidv4 = require('uuid/v4')

const TeamList = props => (
  <>
    {props.state.current_user_teams.map(team => {
      if (team.name.trim().toLowerCase() === props.state.teamSelected.trim().toLowerCase() || props.state.teamSelected === '') {
        return (
          <React.Fragment key={uuidv4()}>
            <tr>
              <td key={team.id} className='team-list' onClick={() => props.selectTeam(team)}>
                {team.name}
              </td>
              <td>
                <Tooltip title='Delete'>
                  <i onClick={() => props.handleDeleteTeam(team)} className='material-icons-outlined'>delete</i>
                </Tooltip>
              </td>
            </tr>
          </React.Fragment>
        )
      } else {
        return null
      }
    })}
  </>
)

export default TeamList

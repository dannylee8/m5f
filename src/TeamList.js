import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

const uuidv4 = require('uuid/v4')

const TeamList = props => (
  <>
    {props.sortUserTeams().map(team => {
      if (team.name.trim().toLowerCase() === props.state.teamSelected.trim().toLowerCase() || props.state.teamSelected === '') {
        return (
          <React.Fragment key={uuidv4()}>
            <tr className={props.isUserTeamAdmin(props.state.current_user, team) ? 'team-list-admin-row' : 'team-list-row'}>
              <td key={team.id} className={props.isUserTeamAdmin(props.state.current_user, team) ? 'team-list-admin' : 'team-list'} onClick={() => props.selectTeam(team)}>
                {team.name}
              </td>
              <td>
                {(props.isUserTeamAdmin(props.state.current_user, team)) ?
                  <>
                    <div className="ui icon button" data-tooltip="admin">
                      <i aria-hidden="true" className="key icon"></i>
                    </div>
                    <div className="ui icon button" data-tooltip="delete team">
                      <i onClick={() => props.onHandleDeleteTeam(team)} aria-hidden="true" className="delete icon"></i>
                    </div>
                  </>
                  : null}
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

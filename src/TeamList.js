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
                    <Tooltip title='Admin'>
                      <i className='material-icons vpn-key'>vpn_key</i>
                    </Tooltip>
                    <Tooltip title='Change Owner'>
                      <i onClick={() => props.handleChangeOwner(team)} className='material-icons swap_horiz'>swap_horiz</i>
                    </Tooltip>
                    <Tooltip title='Delete'>
                      <i onClick={() => props.onHandleDeleteTeam(team)} className='material-icons-outlined'>delete</i>
                    </Tooltip>
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

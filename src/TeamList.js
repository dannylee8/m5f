import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip';

const uuidv4 = require('uuid/v4')

class TeamList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // myState: true
    }
  }

  onClickHandler = (team) => { this.props.selectTeam(team) }

  render () {
    return (
      <>
        {this.props.state.current_user_teams.map(team => {
          if (team.name.trim().toLowerCase() === this.props.state.teamSelected.trim().toLowerCase() || this.props.state.teamSelected === '') {
            return (
              <>
                <tr key={uuidv4()}>
                  <td key={team.id} className='team-list' onClick={e => this.onClickHandler(team)}> 
                    { team.name } 
                  </td>
                  <td>
                    <Tooltip title="Delete">
                        <i onClick={()=>this.props.handleDeleteTeam(team)} className='material-icons-outlined'>delete</i>
                    </Tooltip>
                  </td>
                </tr>
              </>
            )
          } else {
            return null
          }
        })}
    </>
    )
  }
}

export default TeamList

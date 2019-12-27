import React, { Component } from 'react'

class TeamList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // myState: true
    }
  }

  onClickHandler = (e, team) => { this.props.selectTeam(e, team) }

  render () {
    return (
      <>
        {this.props.state.teamSelected ? 
        <>
          <h3 className='fade-in'><i onClick={e => this.props.goBackHandler(e)} className="material-icons">arrow_back</i>{this.props.state.teamSelected}</h3>
          <h6><span className="owner">Team Owner:</span> {this.props.findTeamLeader(this.props.state.teamObject.id).name}</h6>
        </>
          :
        <>
          <h3>Teams:</h3>
          <ul className='fade-in'>
            {this.props.state.current_user_teams.map(team => {
              if (team.name.trim().toLowerCase() === this.props.state.teamSelected.trim().toLowerCase() || this.props.state.teamSelected === '') {
                return <li key={team.id} className='team-list' onClick={e => this.onClickHandler(e, team)}> { team.name } </li>
              } else {
                return null
              }
            })}
          </ul>
        </>
        }
      </>
    )
  }
}

export default TeamList

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
        <h3>Teams:</h3>
        <ul>
          {this.props.state.current_user_teams.map(team => {
            if (team.name.trim().toLowerCase() === this.props.teamSelected.trim().toLowerCase() || this.props.teamSelected === '') {
              return <li key={team.id} onClick={e => this.onClickHandler(e, team)}> { team.name } </li>
            } else {
              return null
            }
          })}
        </ul>
      </>
    )
  }
}

export default TeamList

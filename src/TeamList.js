import React, { Component } from 'react'

class TeamList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // myState: true
    }
  }

  onClickHandler = (e) => { this.props.selectTeam(e) }

  render () {
    return (
      <>
        <h3>Teams:</h3>
        {console.log("TeamList.js ", this.props.state.current_user_teams, this.props.state.current_user_roles)}
        <ul>
          {this.props.state.current_user_teams.map(team => (
            <li key={team.id} onClick={this.onClickHandler}> { team.name } </li>
          ))}
        </ul>
      </>
    )
  }
}

export default TeamList

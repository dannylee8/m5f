import React, { Component } from 'react'
import TeamList from './TeamList'
import { Redirect } from 'react-router-dom'

class Teams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      teamObject: null,
      teamSelected: '',
      showTeam: false
    }
  }

  selectTeam = (e, team) => {
    if ((e.target.innerHTML === this.state.teamSelected) && this.state.showTeam) {
      this.setState({ 
        teamObject: null,
        teamSelected: "",
        showTeam: false
      }) 
    } else if (this.state.showTeam && e.target.innerHTML !== this.state.teamSelected) {
      return;
    } else {
      this.setState({ 
        teamObject: team,
        teamSelected: e.target.innerHTML,
        showTeam: !this.state.showTeam
      }) 
    }
  }

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile' />
    } else {
      return (
        <div className='team-container'>
          <div className='team-content'>
            <TeamList
              state={this.props.state}
              selectTeam={this.selectTeam}
              teamSelected={this.state.teamSelected}
            />
          </div>
          {this.state.teamSelected ? 
          <div>
            {console.log("Current User teams: ", this.props.state.current_user_teams)}
            {console.log("Current User roles: ", this.props.state.current_user_roles)}
          </div>
          :
          null}
        </div>
      )
    }
  }
}

export default Teams

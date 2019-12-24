import React, { Component } from 'react'
import TeamList from './TeamList'
import { Redirect } from 'react-router-dom'

class Teams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      teamSelected: '',
      showTeam: false
    }
  }

  selectTeam = (e) => {
    if ((e.target.innerHTML === this.state.teamSelected) && this.state.showTeam) {
      this.setState({ 
        showTeam: false,
        teamSelected: ""
      }) 
    } else if (this.state.showTeam && e.target.innerHTML !== this.state.teamSelected) {
      return;
    } else {
      this.setState({ 
        showTeam: !this.state.showTeam,
        teamSelected: e.target.innerHTML
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
            Team Selected
          </div>
          :
          null}
        </div>
      )
    }
  }
}

export default Teams

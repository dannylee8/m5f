import React, { Component } from 'react'
import TeamList from './TeamList'
import { Redirect } from 'react-router-dom'

class Teams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
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
              findUserTeams={this.props.findUserTeams} />
          </div>
        </div>
      )
    }
  }
}

export default Teams

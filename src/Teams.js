import React, { Component } from 'react'
import TeamList from './TeamList'
import PositionRow from './PositionRow'
import { Link, Redirect } from 'react-router-dom'

const uuidv4 = require('uuid/v4')

class Teams extends Component {

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile' />
    } else {
      return (
        <div className='team-container fade-in'>
          <div className='team-content fade-in'>
            <TeamList
              state={this.props.state}
              selectTeam={this.props.selectTeam}
              goBackHandler={this.props.goBackHandler}
              findTeamLeader={this.props.findTeamLeader}
            />
            {!this.props.state.teamSelected ? 
              <Link to='/new_team'>
                <button id='new_team' className='btn btn-warning btn-sm'>
                create new team
                </button>
              </Link>
            :
            null}
            {this.props.state.teamSelected ? 
            <table className='positions-table fade-in'>
              <tbody>
                {this.props.findPositionsOnTeam(this.props.state.teamObject.id).map( (p, idx) => <PositionRow key={uuidv4()} singlePosition={p} idx={idx} findUserByID={this.props.findUserByID}/>)}
              </tbody>
            </table>
            :
            null}
          </div>
        </div>
      )
    }
  }
}

export default Teams

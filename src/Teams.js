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
            {this.props.state.teamSelected
              ? <>
                <h3 className='fade-in'><i onClick={e => this.props.goBackHandler(e)} className='material-icons'>arrow_back</i>{this.props.state.teamSelected}</h3>
                <h6><span className='owner'>Team Owner:</span> {this.props.findTeamLeader(this.props.state.teamObject.id).name}</h6>
                </>
              : <h3>Teams:</h3>}
            {!this.props.state.teamSelected
              ? <table className='team-list-table'>
                <tbody>
                  <TeamList
                    key={uuidv4()}
                    state={this.props.state}
                    selectTeam={this.props.selectTeam}
                    goBackHandler={this.props.goBackHandler}
                    findTeamLeader={this.props.findTeamLeader}
                    handleDeleteTeam={this.props.handleDeleteTeam}
                    isUserTeamAdmin={this.props.isUserTeamAdmin}
                  />
                </tbody>
              </table>
              : null}
            {!this.props.state.teamSelected
              ? <Link to='/new_team'>
                <button id='new_team' className='btn btn-warning btn-sm'>
                create new team
                </button>
                </Link>
              : null}
            {this.props.state.teamSelected
              ? <table className='positions-table fade-in'>
                <tbody>
                  {this.props.findPositionsOnTeam(this.props.state.teamObject.id).map((p, idx) => <PositionRow key={uuidv4()} singlePosition={p} idx={idx} findUserByID={this.props.findUserByID} />)}
                </tbody>
              </table>
              : null}
          </div>
        </div>
      )
    }
  }
}

export default Teams

import React, { Component } from 'react'
import TeamList from './TeamList'
import PositionRow from './PositionRow'
import { Link, Redirect, withRouter } from 'react-router-dom'

const uuidv4 = require('uuid/v4')

class Teams extends Component {

  alphabetizedList () {
    const teamPos = this.props.findPositionsOnTeam(this.props.state.teamObject.id).sort((x, y) => {
      const a = this.props.findUserByID(x.user_id)
      const b = this.props.findUserByID(y.user_id)
      if (a === b) {
        return 0
      } else if (a === undefined) {
        return 1
      } else if (b === undefined) {
        return -1
      } else {
        return a.name > b.name ? 1 : -1
      }
    })
    return teamPos.map(tp => this.props.findUserByID(tp.user_id))
  }

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile' />
    } else {
      return (
        <div className='team-container fade-in flex'>
          <div className='team-content fade-in'>
            {this.props.state.teamSelected
              ? <>
                <h3
                  className='fade-in'
                >
                  <i
                    onClick={e => {
                      this.props.goBackHandler()
                      this.props.history.push('/teams') 
                    }}
                    className='material-icons'
                  >arrow_back
                  </i>{this.props.state.teamSelected}
                </h3>
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
                    onHandleDeleteTeam={this.props.handleDeleteTeam}
                    isUserTeamAdmin={this.props.isUserTeamAdmin}
                    sortUserTeams={this.props.sortUserTeams}
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
              ? <>
                <table className='positions-table fade-in'>
                  <tbody>

                    {/* {console.log(this.alphabetizedList())} */}

                    {this.props.findPositionsOnTeam(this.props.state.teamObject.id).map(
                      (p, idx) =>
                        <PositionRow
                          key={uuidv4()}
                          idx={idx}
                          state={this.props.state}
                          singlePosition={p}
                          findUserByID={this.props.findUserByID}
                        />
                    )}
                  </tbody>
                </table>
                <div className='team-right-side'>
                  <img className='logo-img' alt='logo' src="https://media.licdn.com/dms/image/C560BAQHRRh_N0-5QiA/company-logo_200_200/0?e=2159024400&v=beta&t=MZdeSXIXHWKgr2-onv5O1XPR2lQXAH0zzRik1_UXE4U"/>
                  <h4>Description</h4>
                  <div className='justified'>
                    <div className='description-text'>
                      {this.props.state.teamObject.description}
                    </div>
                  </div>
                  <div className='team-right-side'>
                    <h4>Contact</h4>
                    <div className='description-text centered'>
                      <p>{this.props.state.teamObject.address}</p>
                      <p className='centered'>
                        Tel: {this.props.state.teamObject.phone}
                      </p>
                    </div>
                  </div>
                  <p className='centered'>
                    <a href={this.props.state.teamObject.website}>{this.props.state.teamObject.website}</a>
                  </p>
                  <br />
                </div>
              </>
              : null}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(Teams)

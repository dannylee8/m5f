import React, { Component } from 'react'
import TeamList from './TeamList'
import PositionRow from './PositionRow'
import { Redirect } from 'react-router-dom'

const uuidv4 = require('uuid/v4')

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

            {this.state.teamSelected ? 
              <table className='positions-table'>
                <tbody>
                  {this.props.findPositionsOnTeam(this.state.teamObject.id).map( (p, idx) => <PositionRow key={uuidv4()} singlePosition={p} idx={idx} findUserByID={this.props.findUserByID}/>)}
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

import React, { Component } from 'react'
import {
  Switch,
  Redirect,
  Route,
  withRouter
} from 'react-router-dom'

import './App.css'
import Login from './Login'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import Profile from './Profile'
import Search from './Search'
import Teams from './Teams'
import NewUser from './NewUser'
import NewTeam from './NewTeam'
import PositionUserSearch from './PositionUserSearch'
import ErrorBoundary from './ErrorBoundary'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current_user_roles: [],
      current_user_teams: [],
      users: [],
      teams: [],
      roles: [],
      positions: [],
      user_roles: [],
      rerender: false,
      loggedIn: false,
      teamObject: null,
      teamSelected: '',
      showTeam: false
    }
  }

  componentDidMount () {
    window.fetch('http://localhost:3000/api/v1/roles')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          roles: json
        })
      })
    window.fetch('http://localhost:3000/api/v1/user_roles')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          user_roles: json
        })
      })
    window.fetch('http://localhost:3000/api/v1/users')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          users: json
        })
      })
    window.fetch('http://localhost:3000/api/v1/teams')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          teams: json
        })
      })
    window.fetch('http://localhost:3000/api/v1/positions')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          positions: json
        })
      })

    if (window.localStorage.getItem('cUser')) {
      const userID = JSON.parse(window.localStorage.getItem('cUser')).id

      window.fetch(`http://localhost:3000/api/v1/users/${userID}`)
        .then(resp => resp.json())
        .then(json => {
          if (json.id === userID) {
            this.setState((prevState) => ({
              current_user: JSON.parse(window.localStorage.getItem('cUser')),
              current_user_roles: JSON.parse(window.localStorage.getItem('cUserRoles')),
              current_user_teams: JSON.parse(window.localStorage.getItem('cUserTeams')),
              loggedIn: true
            }))
          } else {
            this.handleLogout()
          // console.log('fake logout')
          }
        })
    }
    // console.log(JSON.parse(localStorage.getItem('cUser')))
  }

  findUserByID = (user_id) => this.state.users.find(u => u.id === user_id)

  findTeamByID = (team_id) => this.state.teams.find(t => t.id === team_id)

  findPositionsOnTeam = (team_id) => { 
    return this.state.positions.filter(p => p.team_id === team_id).sort((a, b) => (a.name > b.name) - (a.name < b.name))
    // return this.state.positions.filter(p => p.team_id === team_id)
  }

  findMembersOfTeam = (team_id) => this.findPositionsOnTeam(team_id).filter(p => this.findUserByID(p.id))

  findUserPositions = (user_id) => this.state.positions.filter(pos => pos.user_id === user_id).sort((a, b) => (a.name > b.name) ? 1 : -1)

  isUserTeamAdmin = (user, team) => ((team.admin === user.id) ? true : false )

  listMatchingUserRoles = (role_id) => {
    return this.state.user_roles.filter(ur => ur.role_id === role_id)
  }

  updatePositionsUser = (positionID, userID) => {
    window.fetch(`http://localhost:3000/api/v1/positions/${positionID}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'PATCH',
      body: JSON.stringify({
        user_id: userID
      })
    })
      .then(resp => resp.json())
      .then(newPosition => {
        // update position in state
        // console.log("find the position: ", this.state.positions.find(p => p.id === newPosition.id))

        let posStateArray = this.state.positions.slice()
        let posToReplace = posStateArray.find(p => p.id === newPosition.id)
        let idxToReplace = posStateArray.indexOf(posToReplace)
        
        if (idxToReplace !== -1) {
          posStateArray.splice(idxToReplace, 1);
        }
        posStateArray.push(newPosition)

        // console.log("idxToReplace", idxToReplace)
        // console.log("fetch's position: ", newPosition)

        this.setState({
          positions: posStateArray
        })
      })
  }

  sortUserTeams = () => {
    const adminTeams = []
    const otherTeams = []
    this.state.current_user_teams.forEach(team => {
      if (team.admin === this.state.current_user.id) {
        adminTeams.push(team)
      } else {
        otherTeams.push(team)
      }
    })
    return adminTeams.sort().concat(otherTeams.sort())
  }

  findTeamLeader = (team_id) => {
    const leaderID = this.findTeamByID(team_id).admin
    if (leaderID) {
      return this.findUserByID(leaderID)
    } else {
      return false
    }
  }

  findUserTeams = (user_id) => {
    const positions = this.findUserPositions(user_id)
    // console.log('positions: ', positions)
    const positionTeams = positions.map(position => this.getTeamById(position.team_id))
    const adminTeams = this.state.teams.filter(team => team.admin === user_id)
    var teams = positionTeams.concat(adminTeams)

    teams.sort((a, b) => (a.name > b.name) ? 1 : -1)
    // console.log('findUserTeams: ', this.state.current_user_teams)
    return teams
  }

  getTeamById = (team_id) => this.state.teams.find(team => team.id === team_id)

  findUserRoles = (user_id) => {
    const arr = this.state.user_roles.filter(ur => ur.user_id === user_id)
    arr.sort((a, b) => (a.name > b.name) ? 1 : -1)
    return arr
  }

  logThemIn = (email) => {
    const cUser = this.state.users.find(user => {
      return user.email_address === email
    })

    if (cUser) {
      const cUserRoles = this.findUserRoles(cUser.id)
      const cUserTeams = this.findUserTeams(cUser.id)
      // console.log('App <ln 70> cUserRoles: ', cUserRoles)   
      this.setState({
        current_user: cUser,
        current_user_roles: cUserRoles,
        current_user_teams: cUserTeams,
        loggedIn: true
      })
      window.localStorage.setItem('cUser', JSON.stringify(cUser))
      window.localStorage.setItem('cUserRoles', JSON.stringify(cUserRoles))
      window.localStorage.setItem('cUserTeams', JSON.stringify(cUserTeams))
      // console.log('App <ln 75> Local user: ', window.localStorage.getItem('cUser'))
      return true
    } else {
      return false
    }
  }

  handleLogout = () => {
    // console.log('click')
    this.setState({
      current_user: undefined,
      current_user_roles: [],
      current_user_teams: [],
      loggedIn: false
    })
    window.localStorage.clear()
  }

  handleDelete = () => {
    // console.log('delete click in app')
    this.removeUserFromState()
    this.destroyUser(this.state.current_user.id)
    this.setState({
      current_user: undefined,
      current_user_roles: [],
      current_user_teams: [],
      loggedIn: false
    })
    window.localStorage.clear()
  }

  addUserToState = (user) => {
    this.setState({ users: [...this.state.users, user] })
    return this.state.users
  }

  addUserToState = (user) => {
    this.setState({ users: [...this.state.users, user] })
    return this.state.users
  }

  addUserRoleToState = (userRole) => {
    this.setState({ 
      user_roles: [...this.state.user_roles, userRole],
      current_user_roles: [...this.state.current_user_roles, userRole]
    })
    window.localStorage.setItem('cUserRoles', JSON.stringify(this.state.current_user_roles))
  }


  addTeamToState = (Team) => {
    this.setState({ 
      teams: [...this.state.teams, Team],
      current_user_teams: [...this.state.current_user_teams, Team]
    })
    window.localStorage.setItem('cUserTeams', JSON.stringify(this.state.current_user_teams))
  }

  changeUserName = (string) => {
    if (this.state.current_user) {
      const newState = Object.assign({}, this.state)
      newState.current_user.name = string
      this.setState(newState)
      window.localStorage.setItem('cUser', JSON.stringify(this.state.current_user))
    } else {
    }
  }

  changeEmailAddress = (string) => {
    if (this.state.current_user) {
      const newState = Object.assign({}, this.state)
      newState.current_user.email_address = string
      this.setState(newState)
      window.localStorage.setItem('cUser', JSON.stringify(this.state.current_user))
      // console.log(this.state)
      // console.log(localStorage)
    } else {
    }
  }

  removeUserFromState = () => {
    const array = [...this.state.users]
    const index = array.indexOf(this.state.current_user)
    if (index !== -1) {
      array.splice(index, 1)
      this.setState({ users: array })
    }
    return array
  }

  destroyUser = (id) => {
    return window.fetch(`http://localhost:3000/api/v1/users/${id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'DELETE'})
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({ status: res.status, statusText: res.statusText });
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log('Error, with message:', err.statusText))
  }

  onHandleDeleteUserRole = (ur) => {
    this.removeUserRoleFromState(ur)
    this.destroyUserRole(ur)
  }

  removeUserRoleFromState = (ur) => {
    let user_roles_array = [...this.state.user_roles]
    let current_user_roles_array = [...this.state.current_user_roles]
    let index = user_roles_array.indexOf(ur)
    let index2 = current_user_roles_array.indexOf(ur)
    if (index !== -1) {
      user_roles_array.splice(index, 1)
      this.setState({ user_roles: user_roles_array })
    }
    if (index2 !== -1) {
      current_user_roles_array.splice(index2, 1)
      this.setState({ users: current_user_roles_array })
    }
    return user_roles_array
  }

  destroyUserRole = (ur) => {
    return window.fetch(`http://localhost:3000/api/v1/user_roles/${ur.id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'DELETE'})
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject({ status: res.status, statusText: res.statusText })
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log('Error, with message:', err.statusText))
  }

  // TEAMS.JS FUNCTIONS:
  goBackHandler = () => {
    this.setState({
      teamObject: null,
      teamSelected: '',
      showTeam: false
    })
    
  }

  setNewTeam = (team) => {
    if (team) {
      this.setState({
        teamObject: team,
        teamSelected: team.name,
        showTeam: true
      })
    }
  }

  selectTeam = (team) => {
    if ((team.name === this.state.teamSelected) && this.state.showTeam) {
      this.setState({
        teamObject: null,
        teamSelected: '',
        showTeam: false
      }) 
    } else if (this.state.showTeam && team.name !== this.state.teamSelected) {
    } else {
      this.setState({
        teamObject: team,
        teamSelected: team.name,
        showTeam: !this.state.showTeam
      })
      this.props.history.push('/teams/' + team.name.replace(/ /g, '-'))
    }
  }

  handleDeleteTeam = (team) => {
    if (team) { 
      this.removeTeamFromState(team)
      this.destroyTeam(team)
      this.goBackHandler()
      return <Redirect to='/teams' />
    }
  }

  removeTeamFromState = (team) => {
    const teams_array = [...this.state.teams]
    const current_user_teams_array = [...this.state.current_user_teams]
    // console.log(teams_array)
    // console.log(current_user_teams_array)
    const index = teams_array.indexOf(team)
    const index2 = current_user_teams_array.indexOf(team)
    // console.log(index)
    // console.log(index2)
    if (index !== -1) {
      teams_array.splice(index, 1)
      this.setState({ teams: teams_array });
    }
    if (index2 !== -1) {
      current_user_teams_array.splice(index2, 1)
      this.setState({ current_user_teams: current_user_teams_array });
      localStorage.setItem('cUserTeams', JSON.stringify(current_user_teams_array))
    }
    console.log(localStorage.getItem('cUserTeams'))
    return current_user_teams_array
  }

  destroyTeam = (team) => {
    return window.fetch(`http://localhost:3000/api/v1/teams/${team.id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'DELETE'})
      .then(res => {
        if (res.ok) {
          console.log(res)
          return res.json();
        } else {
          return Promise.reject({ status: res.status, statusText: res.statusText });
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log('Error, with message:', err))
  }
  // END - TEAMS.JS FUNCTIONS

  render () {
    if (this.state.users.length > 0) {
      // console.log(this.state.users)
      // console.log(this.findMembersOfTeam(2))
      console.log('Has roles: clinton@gmail.com')
      console.log('Has teams: chet@gmail.com')
      // console.log(this.state.positions)
    }
    return (
      <ErrorBoundary>
        <div className='App'>
          <div className='App-header'>
            <TopBar />
          </div>
          <div className='App-body'>
            <Sidebar cUser={this.state.current_user} goBackHandler={this.goBackHandler} handleLogout={this.handleLogout} handleDelete={this.handleDelete} />
            {/* {(this.state.current_user) ? 'logged in' : 'logged out'} */}
            {(this.state.current_user) ? <Redirect to='/profile' /> : <Redirect to='/login' />}
              <div className='page-container'>
              <Switch>
              <Route path='/login'>
                <Login logthemin={this.logThemIn} />
              </Route>
              <Route path='/profile'>
                {(this.state.current_user) ? <Profile state={this.state}
                                                      onHandleDeleteUserRole={this.onHandleDeleteUserRole} 
                                                      findUserRoles={this.findUserRoles}
                                                      addUserRoleToState={this.addUserRoleToState}
                                                      changeUserName={this.changeUserName} 
                                                      changeEmailAddress={this.changeEmailAddress} /> : <Redirect to='/login' />}
              </Route>
              <Route path='/teams' component={ (props) => (
                <Teams  state={this.state}
                        findUserTeams={this.findUserTeams}
                        findTeamByID={this.findTeamByID}
                        findPositionsOnTeam={this.findPositionsOnTeam}
                        findUserByID={this.findUserByID}
                        findTeamLeader={this.findTeamLeader}
                        goBackHandler={this.goBackHandler}
                        selectTeam={this.selectTeam}
                        isUserTeamAdmin={this.isUserTeamAdmin}
                        handleDeleteTeam={this.handleDeleteTeam}
                        sortUserTeams={this.sortUserTeams}
                        listMatchingUserRoles ={this.listMatchingUserRoles}
                />
              )}>
              </Route>
              <Route path='/search'>
                <Search   state={this.state} />
              </Route>
              <Route path='/position-user-search'>
                <PositionUserSearch state={this.state} 
                                    location={this.props.location}
                                    listMatchingUserRoles={this.listMatchingUserRoles}
                                    findUserByID={this.findUserByID}
                                    getTeamById={this.getTeamById}
                                    updatePositionsUser={this.updatePositionsUser}
                />
              </Route>
              <Route path='/new_user'>
                <NewUser  logThemIn={this.logThemIn} 
                          addUserToState={this.addUserToState} 
                          addUserRoleToState={this.addUserRoleToState}/>
              </Route>
              <Route path='/new_team'>
                <NewTeam state={this.state} setNewTeam={this.setNewTeam} addTeamToState={this.addTeamToState} />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
              </div>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}

function Home () {
  return <h2>Home</h2>
}

export default withRouter(App)

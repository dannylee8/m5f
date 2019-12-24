import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import './App.css'
import Login from './Login'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import Profile from './Profile'
import Search from './Search'
import Teams from './Teams'
import NewUser from './NewUser'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current_user: undefined,
      current_user_roles: [],
      current_user_teams: [],
      users: [],
      teams: [],
      roles: [],
      positions: [],
      user_roles: [],
      rerender: false,
      loggedIn: false
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
    // console.log(JSON.parse(localStorage.getItem('cUser')))
    if (localStorage.getItem('cUser')) {

      let userID = JSON.parse(localStorage.getItem('cUser')).id

      window.fetch(`http://localhost:3000/api/v1/users/${userID}`)
      .then(resp => resp.json())
      .then(json => {
        if (json.id === userID) {
          this.setState((prevState) => ({
            current_user: JSON.parse(localStorage.getItem('cUser')),
            current_user_roles: JSON.parse(localStorage.getItem('cUserRoles')),
            current_user_teams: JSON.parse(localStorage.getItem('cUserTeams')),
            loggedIn: true
          }));
        } else {
          this.handleLogout()
          // console.log("fake logout")
        }
      })
    }
    // console.log(JSON.parse(localStorage.getItem('cUser')))
  }

  findUserByID = (user_id) => this.state.users.find( u => u.id === user_id)
  
  findTeamByID = (team_id) => this.state.teams.find( t => t.id === team_id)

  findPositionsOnTeam = (team_id) => this.state.positions.filter( p => p.team_id === team_id)
  
  findMembersOfTeam = (team_id) => this.findPositionsOnTeam(team_id).filter( p => this.findUserByID(p.id))

  findUserPositions = (user_id) => this.state.positions.filter( ur => ur.user_id === user_id).sort((a, b) => (a.name > b.name) ? 1 : -1)

  findUserTeams = (user_id) => {
    let positions = this.findUserPositions(user_id)
    console.log("positions: ", positions)
    let teams = positions.map(position => this.getTeamById(position.team_id))
    teams.sort((a, b) => (a.name > b.name) ? 1 : -1)
    console.log("findUserTeams: ", this.state.current_user_teams)
    return teams
  }

  getTeamById = (team_id) => this.state.teams.find( team => team.id === team_id)

  findUserRoles = (user_id) => {
    let arr = this.state.user_roles.filter(ur => ur.user_id === user_id) 
    arr.sort((a, b) => (a.name > b.name) ? 1 : -1)
    return arr
  }

  logThemIn = (email) => {
    const cUser = this.state.users.find(user =>  {
      return user.email_address === email
    })

    if (cUser) {
      let cUserRoles = this.findUserRoles(cUser.id)
      let cUserTeams = this.findUserTeams(cUser.id)
      // console.log("App <ln 70> cUserRoles: ", cUserRoles)   
      this.setState({
        current_user: cUser,
        current_user_roles: cUserRoles,
        current_user_teams: cUserTeams,
        loggedIn: true
      })
      localStorage.setItem('cUser', JSON.stringify(cUser))
      localStorage.setItem('cUserRoles', JSON.stringify(cUserRoles))
      localStorage.setItem('cUserTeams', JSON.stringify(cUserTeams))
      // console.log("App <ln 75> Local user: ", localStorage.getItem('cUser'))
      return true
    }
    else {
      return false
    }
  }

  handleLogout = () => {
    // console.log("click")
    this.setState({
      current_user: undefined,
      current_user_roles: [],
      current_user_teams: [],
      loggedIn: false
    })
    localStorage.clear();
  }

  handleDelete = () => {
    // console.log("delete click in app")
    this.removeUserFromState()
    this.destroyUser(this.state.current_user.id)
    this.setState({
      current_user: undefined,
      current_user_roles: [],
      current_user_teams: [],
      loggedIn: false
    })
    localStorage.clear();
  }

  addUserToState = (user) => {
    this.setState({ users: [...this.state.users, user] });
    return this.state.users
  }

  addUserRoleToState = (userRole) => {
    this.setState({ 
      user_roles: [...this.state.user_roles, userRole],
      current_user_roles: [...this.state.current_user_roles, userRole]
    })
  }

  addUserTeamToState = (userTeam) => {
    this.setState({ 
      user_roles: [...this.state.teams, userTeam],
      current_user_teams: [...this.state.current_user_teams, userTeam]
    })
  }

  changeUserName = (string) => {
    if (this.state.current_user) {
      let newState = Object.assign({}, this.state);
      newState.current_user.name = string;
      this.setState(newState);
      localStorage.setItem('cUser', JSON.stringify(this.state.current_user))
    } else {
      return;
    }
  }

  changeEmailAddress = (string) => {
    if (this.state.current_user) {
      let newState = Object.assign({}, this.state);
      newState.current_user.email_address = string;
      this.setState(newState);
      localStorage.setItem('cUser', JSON.stringify(this.state.current_user))
      // console.log(this.state)
      // console.log(localStorage)
    } else {
      return;
    }
  }

  removeUserFromState = () => {
    let array = [...this.state.users]
    let index = array.indexOf(this.state.current_user)
    if (index !== -1) {
      array.splice(index, 1)
      this.setState({ users: array });
    }
    return array
  }

  destroyUser = (id) => {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
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

  handleDeleteUserRole = (ur) => {
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
      this.setState({ user_roles: user_roles_array });
    }
    if (index2 !== -1) {
      current_user_roles_array.splice(index2, 1)
      this.setState({ users: current_user_roles_array });
    }
    return user_roles_array
  }

  destroyUserRole = (ur) => {
    return fetch(`http://localhost:3000/api/v1/user_roles/${ur.id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
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

  render () {
    if (this.state.users.length > 0) {
      // console.log(this.state.users)
      // console.log(this.findMembersOfTeam(2))
      console.log("Has roles: marvella@gmail.com (4)")
      console.log("Has teams: consuela@gmail.com (4)")
    }
    return (
      <Router>
        <div className='App'>
          <div className='App-header'>
            <TopBar />
          </div>
          <div className='App-body'>
            <Sidebar cUser={this.state.current_user} handleLogout={this.handleLogout} handleDelete={this.handleDelete} />
            {/* {(this.state.current_user) ? 'logged in' : 'logged out'} */}
            {(this.state.current_user) ? <Redirect to='/profile' /> : <Redirect to='/login' />}
              <div className="page-container">
              <Switch>
              <Route path='/login'>
                <Login logthemin={this.logThemIn} />
              </Route>
              <Route path='/profile'>
                {(this.state.current_user) ? <Profile state={this.state}
                                                      handleDeleteUserRole={this.handleDeleteUserRole} 
                                                      findUserRoles={this.findUserRoles}
                                                      addUserRoleToState={this.addUserRoleToState}
                                                      changeUserName={this.changeUserName} 
                                                      changeEmailAddress={this.changeEmailAddress} /> : <Redirect to='/login' />}
              </Route>
              <Route path='/teams'>
                <Teams  state={this.state}
                        findUserTeams={this.findUserTeams}
                        findUserPositions={this.findUserPositions}
                        findTeamByID={this.findTeamByID}
                        findPositionsOnTeam={this.findPositionsOnTeam}
                />
              </Route>
              <Route path='/search'>
                <Search />
              </Route>
              <Route path='/new_user'>
                <NewUser logThemIn={this.logThemIn} addUserToState={this.addUserToState} addUserRoleToState={this.addUserRoleToState}/>
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
              </div>
          </div>
        </div>
      </Router>
    )
  }
}

function Home () {
  return <h2>Home</h2>
}

export default App

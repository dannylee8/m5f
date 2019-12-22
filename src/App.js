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
      users: [],
      teams: [],
      roles: [],
      positions: [],
      user_roles: [],
      current_user_roles: []
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
    if (localStorage.getItem('cUser')) {
      this.setState({
        current_user: JSON.parse(localStorage.getItem('cUser'))
      })
    }
  }

  findUserRoles = (user_id) => {
    return this.state.user_roles.filter(ur => ur.user_id === user_id) 
  }

  logThemIn = (email) => {
    const cUser = this.state.users.find(user =>  {
      return user.email_address === email
    })
    if (cUser) {
      let cUserRoles = this.findUserRoles(cUser.id)
      console.log("App <ln 70> cUserRoles: ", cUserRoles)   
      this.setState({
        current_user: cUser,
        current_user_roles: cUserRoles
      })
      localStorage.setItem('cUser', JSON.stringify(cUser))
      console.log("App <ln 75> Local user: ", localStorage.getItem('cUser'))
    }
    else {
      console.log("error!  no cUser")
    }
  }

  handleLogout = () => {
    // console.log("click")
    this.setState({
      current_user: undefined
    })
    localStorage.clear();
  }

  handleDelete = () => {
    // console.log("delete click in app")
    this.removeUserFromState()
    this.destroyUser(this.state.current_user.id)
    this.setState({
      current_user: undefined
    })
    localStorage.clear();
  }

  addUserToState = (user) => {
    this.setState({ users: [...this.state.users, user] });
    return this.state.users
  }

  addUserRoleToState = (userRole) => {
    this.setState({ current_user_roles: [...this.state.current_user_roles, userRole]})
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
      console.log("App: render: ", this.state)
      console.log("has roles:", "palmer@gmail.com")
      console.log("has no roles:", "hank@gmail.com")
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
                                                      addUserRoleToState={this.addUserRoleToState} /> : <Redirect to='/login' />}
              </Route>
              <Route path='/teams'>
                <Teams />
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

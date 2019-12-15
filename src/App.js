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
      positions: [],
      user_roles: [],
      current_user_roles: []
    }
  }

  componentDidMount () {
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
  }

  findUserRoles = (user_id) => {
    return this.state.user_roles.filter(ur => ur.user_id === user_id)
  }

  logThemIn = (email) => {
    const cUser = this.state.users.find(user =>  {
      return user.email_address === email
    })
    let cUserRoles = this.findUserRoles(cUser.id)
    console.log("App <ln 70> cUserRoles: ", cUserRoles)   
    this.setState({
      current_user: cUser,
      current_user_roles: cUserRoles
    })
    localStorage.setItem('cUser', JSON.stringify(cUser))
    console.log("App <ln 75> Local user: ", localStorage.getItem('cUser'))
  }

  handleLogout = () => {
    // console.log("click")
    this.setState({
      current_user: undefined
    })
    localStorage.clear();
  }

  render () {
    console.log("App: render: ", this.state)
    console.log("has roles:", "roosevelt@hotmail.com")
    console.log("has no roles:", "cordell@yahoo.com")
    return (
      <Router>
        <div className='App'>
          <div className='App-header'>
            <TopBar />
          </div>
          <div className='App-body'>
            <Sidebar cUser={this.state.current_user} handleLogout={this.handleLogout} />
            {/* {(this.state.current_user) ? 'logged in' : 'logged out'} */}
            {(this.state.current_user) ? <Redirect to='/profile' /> : <Redirect to='/login' />}
            <Switch>
              <Route path='/login'>
                <Login logthemin={this.logThemIn} />
              </Route>
              <Route path='/profile'>
                {(this.state.current_user) ? <Profile state={this.state} /> : <Redirect to='/login' />}
              </Route>
              <Route path='/teams'>
                <Teams />
              </Route>
              <Route path='/search'>
                <Search />
              </Route>
              <Route path='/new_user'>
                <NewUser />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
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

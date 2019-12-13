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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current_user: undefined,
      users: {},
      teams: {},
      positions: {}
    }
  }

  componentDidMount () {
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

  logThemIn = (email) => {
    const cUser = this.state.users.find(user =>  {
      return user.email_address === email
    })
    this.setState({
      current_user: cUser
    })
  }

  handleLogout = () => {
    this.setState({
      current_user: undefined
    })
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <div className='App-header'>
            <TopBar />
          </div>
          <div className='App-body'>
            <Sidebar cUser={this.state.current_user} handleLogout={this.handleLogout} />
            {(this.state.current_user) ? 'logged in' : 'logged out'}
            {(this.state.current_user) ? <Redirect to='/profile' /> : <Redirect to='/login' />}
            <Switch>
              <Route path='/login'>
                <Login logThemIn={this.logThemIn} />
              </Route>
              <Route path='/profile'>
                <Profile state={this.state}/>
              </Route>
              <Route path='/teams'>
                <Teams />
              </Route>
              <Route path='/search'>
                <Search />
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

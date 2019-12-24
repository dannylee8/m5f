import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myState: true
    }
  }

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile' />
    } else {
      return (
        <div>
          <h1>Hello Search</h1>
        </div>
      )
    }
  }
}

export default Search


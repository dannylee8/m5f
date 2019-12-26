import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // myState: true
    }
  }

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile' />
    } else {
      return (
        <div className='search-container fade-in'>
          <div className='search-content fade-in'>
            <h3>Search for teams:</h3>
          </div>
        </div>
      )
    }
  }
}

export default Search


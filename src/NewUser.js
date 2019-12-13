import React, { Component } from 'react'

class NewUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myState: true
    }
  }

  render () {
    return (
      <div>
        <h1>Hello NewUser</h1>
      </div>
    )
  }
}

export default NewUser

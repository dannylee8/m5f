import React, { Component } from 'react'

class Person extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myState: true
    }
  }

  render () {
    return (
      <div>
        <h1>Hello Person</h1>
      </div>
    )
  }
}

export default Person

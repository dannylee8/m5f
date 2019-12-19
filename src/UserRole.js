import React, { Component } from 'react'

class UserRole extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editYrs: false,
      value: '',
      singleRole: this.props.singleRole
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  keyPressed = (event) => {
    console.log(this.state.singleRole.id)
    if (event.key === "Enter") {
      this.state.singleRole.years_exp = event.target.value
      fetch(`http://localhost:3000/api/v1/user_roles/${this.state.singleRole.id}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "PATCH",
        body: JSON.stringify({
          years_exp: event.target.value
        })
      })
      .then(response => response.json())
      .then(json => console.log(json))
      this.setState({
        editYrs: !this.state.editYrs,
        value: ''
      })
    }
  }

  inputYrs = () => {
    return (
      <input  type='number' 
                  value={this.state.input} 
                  onChange={this.handleChange} 
                  onKeyPress={this.keyPressed}
                  className='years-input' 
                  name="yrsExp"
                  step="1" min="0" max="50" 
                  required pattern="\d*" 
                  length='3' size='3' />
    )
  }

  onClickHandler = () => {
    this.setState({
      editYrs: !this.state.editYrs
    })
  }

  render () {
    return (
      <>
        <tr>
          <td>{this.props.singleRole.name}</td>
          <td>{this.state.editYrs ? this.inputYrs() : this.state.singleRole.years_exp}</td>
          <td>
            <i onClick={this.onClickHandler} className='material-icons'>edit</i>
            <i onClick={()=>this.props.handleDeleteUserRole(this.props.singleRole)} className='material-icons'>delete</i>
          </td>
        </tr>
      </>
    )
  }
}

export default UserRole
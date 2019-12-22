import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip';

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
    event.persist()
    if (event.key === "Enter") {
      this.setState(prevState => ({
        singleRole: {                   
            ...prevState.singleRole,    
            years_exp: parseInt(event.target.value, 10)
        }
      }))
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
    this.setState(prevState => ({
      singleRole: {                   
          ...prevState.singleRole,    
          years_exp: parseInt(this.state.value, 10)
      }
    }))
    fetch(`http://localhost:3000/api/v1/user_roles/${this.state.singleRole.id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PATCH",
      body: JSON.stringify({
        years_exp: this.state.value
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
    this.setState({
      editYrs: !this.state.editYrs,
      value: ''
    })
  }


  render () {
    return (
      <>
        <tr>
          <td>{this.props.singleRole.name}</td>
          <td>{this.state.editYrs ? this.inputYrs() : this.state.singleRole.years_exp}</td>
          <td>
            <Tooltip title="Edit">
              <i onClick={this.onClickHandler} className='material-icons-outlined'>edit</i>
            </Tooltip>
            <Tooltip title="Delete">
              <i onClick={()=>this.props.onHandleDeleteUserRole(this.props.singleRole)} className='material-icons-outlined'>delete</i>
            </Tooltip>
          </td>
        </tr>
      </>
    )
  }
}

export default UserRole
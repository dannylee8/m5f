import React, { Component } from 'react'
import UserRoles from './UserRoles'
import ProfileIcon from './icons/001-bear.png'
import CheckboxGroupProfile from './CheckboxGroupProfile'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { OPTIONS } from './_options'

class Profile extends Component {
  state = {
    icon: ProfileIcon,
    showAddRoles: false,
    role_options: [],
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    ),
    yrsExp: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: null
      }),
      {}
    )
  }

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }))
    })
  }

  selectAll = () => this.selectAllCheckboxes(true)

  deselectAll = () => this.selectAllCheckboxes(false)

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target
    // console.log(changeEvent.target.value)
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }))
    this.didUserEnterRoles()
  };

  isOptionSelected = option => {
    return this.state.checkboxes[option]
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleYrsExpChange = (changeEvent) => {
    changeEvent.persist()
    const { name, value } = changeEvent.target
    // console.log(name, value)
    this.setState(prevState => ({
      yrsExp: {
        ...prevState.yrsExp,
        [name]: value
      }
    }))
  }

  removeFromArray (original, remove) {
    return original.filter(value => !remove.includes(value))
  }

  filterRoleOptions = () => {
    var allRoles = OPTIONS
    var userRolesObjects = this.props.findUserRoles(this.props.state.current_user.id)
    var userRoles = []
    var arr = []

    for (let i = 0; i < userRolesObjects.length; i++) {
      for (const [key, value] of Object.entries(userRolesObjects[i])) {
        // console.log('hello', key, value)
        if (key === 'name') {
          userRoles.push(value)
        }
      }
    }

    arr = this.removeFromArray(allRoles, userRoles)
    // console.log(userRoles)
    // console.log(this.removeFromArray(allRoles, userRoles))
    return arr
  }

  hasAvailableRoles = () => {
    console.log('hasAvailableRoles: ', this.filterRoleOptions().length)
    return (this.filterRoleOptions().length > 0)
  }

  handleClickShowAddRoleTable = () => {
    this.setState({
      showAddRoles: !this.state.showAddRoles,
      role_options: this.filterRoleOptions()
    })
  }

  didUserEnterRoles = () => {
    const entries = Object.entries(this.state.yrsExp).filter(e => {
      if (e[1] > 0) {
        return e
      }
      return null
    })
    return entries.length > 0
  }

handleClickAddRoles = () => {
  const entries = Object.entries(this.state.yrsExp)
  const entriesMap = entries.filter(e => {
    if (e[1] > 0) {
      return e
    }
    return null
  })
  // console.log('Entries Map: ', entriesMap)
  entriesMap.forEach(e => {
    window.fetch('http://localhost:3000/api/v1/user_roles', {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.state.current_user.id,
        role_id: OPTIONS.indexOf(e[0]) + 1,
        name: e[0],
        years_exp: e[1]
      })
    })
      .then(resp => resp.json())
      .then(role => {
        this.props.addUserRoleToState(role)
        console.log('entriesMap: ', role)
        console.log('this.props: ', this.props)
      })
  })
  this.setState({
    showAddRoles: !this.state.showAddRoles,
    yrsExp: [],
    checkboxes: []
  })
}

  handleUserNameChange = () => {
    var newName = window.prompt('Please enter your name:', this.props.state.current_user.name)
    // console.log(this.props.state.current_user.id)
    if (newName === null || newName === '') {
    } else if (newName.toLowerCase() === this.props.state.current_user.name.toLowerCase()) {
    } else if (newName.length < 2) {
    } else {
      window.fetch(`http://localhost:3000/api/v1/users/${this.props.state.current_user.id}`, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'PATCH',
        body: JSON.stringify({
          name: newName
        })
      })
        .then(resp => resp.json())
        .then(role => {
          this.props.changeUserName(newName)
        })
    }
  }

  validateEmail (value) {
    // eslint-disable-next-line
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(value) === false) {
      return false
    } else {
      return true
    }
  }

  handleUserEmailChange = () => {
    var newEmail = window.prompt('Please enter your email:', this.props.state.current_user.email_address)
    // console.log(this.props.state.current_user.id)
    if (newEmail === null || newEmail === '') {
    } else if (newEmail.toLowerCase() === this.props.state.current_user.email_address.toLowerCase()) {
    } else if (!this.validateEmail(newEmail)) {
    } else {
      const isCorrect = window.confirm(`Do you want to change your email to ${newEmail}?`)
      if (isCorrect) {
        window.fetch(`http://localhost:3000/api/v1/users/${this.props.state.current_user.id}`, {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          method: 'PATCH',
          body: JSON.stringify({
            email_address: newEmail
          })
        })
          .then(resp => resp.json())
          .then(role => {
            this.props.changeEmailAddress(newEmail)
          })
      } else {
      }
    }
  }

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile' />
    } else {
      return (
        <div className='profile-container'>
          {/* <div>
            <img className='profile-img' alt='profile placeholder' src={this.state.icon} />
          </div> */}
          <div className='profile-content'>
            <div className='left-column'>
              <table className='user-table'>
                <tbody>
                  <tr>
                    <td className='cUser'>Name:</td>
                    <td
                      onClick={this.handleUserNameChange}
                      className='cUser'
                    >{(this.props.state.current_user)
                        ? `${this.props.state.current_user.name}`
                        : '!'}
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td
                      onClick={this.handleUserEmailChange}
                    >{(this.props.state.current_user)
                        ? `${this.props.state.current_user.email_address}`
                        : '!'}
                    </td>
                  </tr>
                </tbody>
              </table>
              <UserRoles onHandleDeleteUserRole={this.props.onHandleDeleteUserRole} currentUserRoles={this.props.findUserRoles(this.props.state.current_user.id)} />
            </div>
            <div className='right-column'>
              <div className='right-content'>
                {(this.state.showAddRoles)
                  ? <>
                    <table className='add-roles-table'>
                      <tbody>
                        <CheckboxGroupProfile
                          isSelected={this.isOptionSelected}
                          roleOptions={this.state.role_options}
                          onCheckboxChange={this.handleCheckboxChange}
                          onInputChange={this.handleInputChange}
                          onYrsExpChange={this.handleYrsExpChange}
                          state={this.props.state}
                          filterRoleOptions={this.filterRoleOptions}
                        />
                      </tbody>
                    </table>
                    <p />
                    <Button
                      onClick={this.handleClickAddRoles}
                      className='btn btn-primary'
                    >save
                    </Button>
                    </>
                  : 
                  (this.filterRoleOptions().length > 0) ?
                    <div className='text-center'>
                      <Button onClick={this.handleClickShowAddRoleTable} type='button' className='btn-add-roles'>
                        <i className='material-icons-outlined'>add_box</i>add roles
                      </Button>
                    </div>
                    : null}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Profile

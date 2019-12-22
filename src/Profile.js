import React, { Component } from 'react'
import UserRoles from './UserRoles'
import ProfileIcon from './icons/001-bear.png'
import CheckboxGroupProfile from './CheckboxGroupProfile'

const OPTIONS = [
  "developer",
  "product owner",
  "project manager",
  "scrum master",
  "architect",
  "ux/ui",
  "devops",
  "qa"
];

class Profile extends Component {

  state = {
    icon: ProfileIcon,
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
      }));
    });
  };
  
  selectAll = () => this.selectAllCheckboxes(true);
  
  deselectAll = () => this.selectAllCheckboxes(false);
  
  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    console.log(changeEvent.target.value)
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };
  
  isOptionSelected = option => {
    return this.state.checkboxes[option]
  }
  
  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleYrsExpChange = (changeEvent) => {
    changeEvent.persist()
    const { name, value } = changeEvent.target;
    console.log(name, value)
    this.setState(prevState => ({
      yrsExp: {
        ...prevState.yrsExp,
        [name]: value
      }
    }));
  }

  removeFromArray(original, remove) {
    return original.filter(value => !remove.includes(value))
  }

  filterRoleOptions = () => {
    var allRoles = OPTIONS
    var userRolesObjects = this.props.findUserRoles(this.props.state.current_user.id)
    var userRoles = []

    for (let i=0; i<userRolesObjects.length; i++) {
      for (let [key, value] of Object.entries(userRolesObjects[i])) {
        // console.log("hello", key, value)
        if (key === "name") {
          userRoles.push(value)
        }
      }
    }

    // console.log(userRoles)
    // console.log(this.removeFromArray(allRoles, userRoles))
    
    return this.removeFromArray(allRoles, userRoles)
  }

  render () {
    // console.log(this.props.state.current_user_roles)
    return (
      <div className='profile-container'>
        <div>
          <img className='profile-img' alt='profile placeholder' src={this.state.icon} />
        </div>
        <div className='profile-content'>
          <div className='left-column'>
            <table className='user-table'>
              <tbody>
                <tr>
                  <td className='cUser'>Name:</td>
                  <td className='cUser'>{(this.props.state.current_user) ? `${this.props.state.current_user.name}` : '!'}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{(this.props.state.current_user) ? `${this.props.state.current_user.email_address}` : '!'}</td>
                </tr>
              </tbody>
            </table>
            <UserRoles handleDeleteUserRole={this.props.handleDeleteUserRole} currentUserRoles={this.props.findUserRoles(this.props.state.current_user.id)} />
          </div>
          <div className='right-column'>
            <CheckboxGroupProfile isSelected={this.isOptionSelected} 
                                  roleOptions={this.filterRoleOptions()}
                                  onCheckboxChange={this.handleCheckboxChange}
                                  onInputChange={this.handleInputChange}
                                  onYrsExpChange={this.handleYrsExpChange}
                                  state={this.props.state} 
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile

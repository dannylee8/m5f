import React, { Component } from 'react'
import UserRoles from './UserRoles'
import ProfileIcon from './icons/001-bear.png'
import CheckboxGroupProfile from './CheckboxGroupProfile'
import { Button } from 'reactstrap';

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
    var arr = []
    
    for (let i=0; i<userRolesObjects.length; i++) {
      for (let [key, value] of Object.entries(userRolesObjects[i])) {
        // console.log("hello", key, value)
        if (key === "name") {
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
    console.log("hasAvailableRoles: ", this.filterRoleOptions().length)
    return (this.filterRoleOptions().length > 0) ? true : false
  }

  handleClickShowAddRoleTable = () => {
    this.setState({
      showAddRoles: !this.state.showAddRoles,
      role_options: this.filterRoleOptions()
    })

}


handleClickAddRoles = () => {

  const entries = Object.entries(this.state.yrsExp)
  const entriesMap = entries.filter(e => {
    if (e[1] > 0) {
      return e;
    }
    return null;
  })
  // console.log("Entries Map: ", entriesMap)
  entriesMap.forEach(e => {
    fetch('http://localhost:3000/api/v1/user_roles', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        user_id: this.props.state.current_user.id,
        role_id: OPTIONS.indexOf(e[0])+1,
        name: e[0],
        years_exp: e[1]
      })
    })
    .then(resp => resp.json())
    .then(role => {
      this.props.addUserRoleToState(role)
      console.log("entriesMap: ", role)
      console.log("this.props: ", this.props)
    })
  })
}

  render () {
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
            <Button onClick={this.handleClickShowAddRoleTable} className="btn btn-primary">
              { (!this.state.showAddRoles) ? 
                    "add roles >>"
                    :
                    "<< exit"
                    }
            </Button>
          </div>
          <div className='right-column'>

          { (this.state.showAddRoles) ?
            <>
              <CheckboxGroupProfile isSelected={this.isOptionSelected} 
                                    roleOptions={this.state.role_options}
                                    onCheckboxChange={this.handleCheckboxChange}
                                    onInputChange={this.handleInputChange}
                                    onYrsExpChange={this.handleYrsExpChange}
                                    state={this.props.state} 
              />
            </>
            :
            null
            }
            { (this.state.showAddRoles) ? 
              <Button onClick={this.handleClickAddRoles} className="btn btn-primary">
                      save
              </Button>
              :
              null
            }
          </div>
      </div>
    </div>
    )
  }
}

export default Profile

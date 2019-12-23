import React, { Component } from 'react'
import { Button } from 'reactstrap';

class Teams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myState: true
    }
  }

  render () {
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
                  {/* <td onClick={this.handleUserNameChange} 
                      className='cUser'>{(this.props.state.current_user) 
                      ? 
                      `${this.props.state.current_user.name}` 
                      : 
                      '!'}
                  </td> */}
                </tr>
                <tr>
                  <td>Email:</td>
                  {/* <td onClick={this.handleUserEmailChange} >{(this.props.state.current_user) 
                    ? 
                    `${this.props.state.current_user.email_address}` 
                    : 
                    '!'}
                  </td> */}
                </tr>
              </tbody>
            </table>
            {/* <UserRoles handleDeleteUserRole={this.props.handleDeleteUserRole} currentUserRoles={this.props.findUserRoles(this.props.state.current_user.id)} /> */}
          </div>
          <div className='right-column'>
            <div className='right-content'>
            { (this.state.showAddRoles) ?
              <>
                <table className='add-roles-table'>
                  <tbody>
                    {/* <CheckboxGroupProfile isSelected={this.isOptionSelected} 
                                          roleOptions={this.state.role_options}
                                          onCheckboxChange={this.handleCheckboxChange}
                                          onInputChange={this.handleInputChange}
                                          onYrsExpChange={this.handleYrsExpChange}
                                          state={this.props.state} 
                    /> */}
                  </tbody>
                </table>
                <p />
                <Button onClick={this.handleClickAddRoles} className="btn btn-primary">
                                save
                </Button>
              </>
              :
              <div className="text-center">
                <Button onClick={this.handleClickShowAddRoleTable} type="button" className="btn-add-roles">
                  <i className='material-icons-outlined'>add_box</i>add roles  
                </Button>
              </div>
              }
            </div>
          </div>
      </div>
    </div>
    )
  }
}

export default Teams

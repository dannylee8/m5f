import React, { Component } from 'react'
import { Button } from 'reactstrap'
import TeamRoster from './TeamRoster'
import  { Redirect } from 'react-router-dom'

class Teams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  render () {
    if (!this.props.state.loggedIn) {
      return <Redirect to='/profile'  />
    } else {
    return (
      <div className='team-container'>
        <div className='team-content'>
          <div className='left-column'>
            <table className='team-table'>
              <tbody>
                <tr>
                  <td>Teams:</td>
                  {this.props.findUserTeams(this.props.state.current_user.id).map(team => {
                    return <TeamRoster key={team.id} team={team} />
                  })}
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
              {(this.state.showAddRoles)
              ? <>
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
                <Button onClick={this.handleClickAddRoles} className='btn btn-primary'>
                                save
                </Button>
              </>
              :              <div className='text-center'>
                  <Button onClick={this.handleClickShowAddRoleTable} type='button' className='btn-add-roles'>
                    <i className='material-icons-outlined'>add_box</i>add roles
                  </Button>
                </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
}

export default Teams

import React, { Component } from 'react';
import { Button, Container, Form, Fade, Label, Input } from 'reactstrap'
import { withRouter, Redirect } from 'react-router-dom'
import validator from 'validator'

import _ from 'lodash'

const validationMethods = {
  required: (field, value) => {
    if (!value.toString().trim().length) {
      return `This ${field} field is required.`
    }
  },
  isEmail: (field, value) => {
    // eslint-disable-next-line
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(value) === false) {
      return 'Invalid Email Address.'
    }
  },
  isWebsite: (field, value) => {
    // eslint-disable-next-line
      // var reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    // if (reg.test(value) === false) {
    //     return  `Invalid Website Address.`
    // }
    if (!validator.isURL(value)) {
      return 'Invalid Website Address.'
    }
  }
}

const validateForm = (form) => {
  const teamForm = document.getElementById(form)
  return teamForm.querySelectorAll('[validations]')
}

const runValidationRules = (element, errors) => {
  const target = element
  const field = target.name
  const value = target.value
  let validations = element.getAttribute('validations')
  validations = validations.split(',')

  for (let validation of validations) {
    validation = validation.split(':')
      const rule = validation[0]
      const error = validationMethods[rule](field, value)
      errors[field] = errors[field] || {}
      if (error) {
      errors[field][rule] = error
      } else {
      if (_.isEmpty(errors[field])) {
        delete errors[field]
          } else {
        delete errors[field][rule]
          }
    }
  }
  return errors
}

class NewUser extends Component {
  state = {
    name: '',
    website: '',
    admin: '',
    errors: [],
    redirect: false
  };

  // handleInputChange = (e) => {
  //   this.setState({
  //       [e.target.name]: e.target.value
  //   });
  // }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/teams/' + this.state.name.replace(/ /g, '-')
      }} />
    }
  }

  handleInputChange = (event) => {
    const target = event.target
    const field = target.name
    const value = target.value

    const errors = runValidationRules(target, this.state.errors)

    this.setState({
      errors: errors
    })

    this.setState({
      [field]: value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    const formElements = validateForm('createForm')

    formElements.forEach(element => {
      const errors = runValidationRules(element, this.state.errors)
      this.setState({
        errors: errors
      })
    })
    // console.log(this.props.state)

    const name = this.state.name
    const website = this.state.website
    const admin = this.props.state.current_user.id
    const errors = this.state.errors
    if (!this.state.errors.name && !this.state.errors.website && this.props.state.current_user) {
      // console.log(name,email);
      // Create a new user
      fetch('http://localhost:3000/api/v1/teams', {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({
          name: name,
          website: website,
          admin: admin
        })
      })
        .then(resp => resp.json())
        .then(team => {
          console.log(team)
          if (team.name) {
            this.props.addTeamToState(team)
            this.props.setNewTeam(team)
            // this.props.history.push('/teams')
            this.setRedirect(team.name)
          }
        })
    } else {
      console.log(name, website, errors)
    }
  }

  render () {
    return (
      <>
        {this.renderRedirect()} 
        <Container className='create-container'>
          <h4>Create a new team</h4>
          <Form id='createForm' method='post' onSubmit={this.handleFormSubmit}>
            <div>
              <Label>Team Name</Label>
              <Input
                className='input'
                type='text'
                validations={['required']}
                name='name'
                value={this.state.name}
                onChange={this.handleInputChange}
                id='name'
                placeholder="Please enter your new team's name."
              />
            </div>
            <div>
              <Label>Website address</Label>
              <Input
                className='input'
                type='text'
                validations={['required', 'isWebsite']}
                name='website'
                value={this.state.website}
                onChange={this.handleInputChange}
                id='website'
                placeholder='Please enter your website address.'
                  />
            </div>
            <FromValidationError field={this.state.errors.name} />
            <FromValidationError field={this.state.errors.website} />
            <div className='form-group mt-2'>
              <Button type='submit' className='btn btn-primary'>
                    Save
              </Button>
              <Button onClick={() => this.props.history.push('/teams')} className='btn btn-primary'>
                    Exit without Save
              </Button>
            </div>
          </Form>
        </Container>
      </>
    )
  }
}

const FromValidationError = props => (
  <Fade in={Boolean(props.field)} tag='p' className='error'>
    {props.field ? Object.values(props.field).shift() : ''}
  </Fade>
)

export default withRouter(NewUser)

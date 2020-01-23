import React, { Component } from 'react'
import { Button, Container, Form, FormGroup, Label, Input, Fade } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

const validationMethods = {
  required: (field, value) => {
    if (!value.toString().trim().length) {
      return `This ${field} field is required.`
    }
  },
  isEmail: (field,value) => {
    // eslint-disable-next-line
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(value) === false) {
      return 'Invalid Email Address.'
    }
  }
}

const validateForm = (form) => {
  const loginForm = document.getElementById(form)
  return loginForm.querySelectorAll('[validations]')
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

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: [],
      redirect: false
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/new_user' />
    }
  }

    login = (event) => {

      event.preventDefault();

      const formElements = validateForm('loginForm');

      formElements.forEach(element=> {
        const errors = runValidationRules(element, this.state.errors);
        this.setState({
          errors: errors
        });
      })

      const email = this.state.email
      const password = this.state.password
      const errors = this.state.errors
      if (!this.state.errors.email && !this.state.errors.password) {
        if (this.props.logthemin(email)) {
          return true
        } else {
          alert('No such user!')
          this.setState({
            email: '',
            password: ''
          })
        }
      } else {
        console.log(email, password, errors)
      }
    }

  handleChange = (event) => {
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

  render () {
    return (
      <>
        {this.renderRedirect()}
        <Container className='login-container'>
          <Form id='loginForm' method='post' onSubmit={this.login}>
            <FormGroup>
              <div className='login-row'>
                <Label>Email</Label>
                <Input 
                  className='input'
                  type='text'
                  validations={['required','isEmail']}
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                  id='email'
                  placeholder=''
                />
              </div>
              <div className='login-row'>
                <Label>Password</Label>
                <Input
                  className='input'
                  type='password'
                  validations={['required']}
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  id='password'
                  placeholder=''
                />
              </div>
            </FormGroup>
            <Button onClick={this.login} color='secondary'>Login</Button>
            <div className='divider'/>
            <Button onClick={this.setRedirect} color='secondary'>New User</Button>
          </Form>
        </Container>
        <FromValidationError field={this.state.errors.email} />
        <FromValidationError field={this.state.errors.password} />
      </>

    )
  }
}
 
const FromValidationError = props => (
  <Fade in={Boolean(props.field)} tag='p' className='error centered'>
    {props.field ? Object.values(props.field).shift() : '' } 
  </Fade>
)
import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import CheckboxGroup from "./CheckboxGroup";
import { Button, Container, Form, Fade, Label, Input } from 'reactstrap';
import { OPTIONS } from './_options'

import _ from 'lodash'

const validationMethods =  {
  required : (field, value) => {
      if (!value.toString().trim().length) {
          return  `This ${field} field is required.`
      }
  },
  isEmail: (field, value) => {
      // eslint-disable-next-line
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(value) === false) {
          return  `Invalid Email Address.`
      }        
  }
} 

const validateForm = (form) => {
  const loginForm = document.getElementById(form)
      return loginForm.querySelectorAll('[validations]');
}

const runValidationRules  = (element, errors) => {
  const target = element;
  const field =  target.name;
  const value = target.value
  let validations =  element.getAttribute('validations');
  validations =  validations.split(',')

  for (let validation of validations) {
      validation = validation.split(':');
      const rule = validation[0];
      const error = validationMethods[rule](field, value);
      errors[field] = errors[field] || {};
      if(error) {
          errors[field][rule] = error;
      } else {
          if(_.isEmpty(errors[field])) {
              delete errors[field];
          } else {
              delete errors[field][rule];
          }
      }
  }
  return errors;
}

class NewUser extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    errors: [],
    redirect: false,
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
  };

  setRedirect = () => {
    this.setState({
        redirect: true
    })
  }
  renderRedirect = () => {
      if (this.state.redirect) {
          return <Redirect to='/login' />
      }
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

  // handleFormSubmit = formSubmitEvent => {
  //   formSubmitEvent.preventDefault();

  //   Object.keys(this.state.checkboxes)
  //     .filter(checkbox => this.state.checkboxes[checkbox])
  //     .forEach(checkbox => {
  //       console.log(checkbox, "is selected.");
  //     });
  // };

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
    // console.log(changeEvent)
    const { name, value } = changeEvent.target;
    // console.log(name, value)
    this.setState(prevState => ({
      yrsExp: {
        ...prevState.yrsExp,
        [name]: value
      }
    }));
  }

  handleUserInputChange = (event) => {
    const target = event.target;
    const field =  target.name;
    const value = target.value

    const errors = runValidationRules(target, this.state.errors);

    // console.log("errors: ", errors)
    // console.log("errors: ", value)

    this.setState({
      errors: errors
    });
    
    this.setState({
        [field]:  value
    });
  }

  handleCreateUserFormSubmit = (event) => {
    event.preventDefault();

    const formElements = validateForm("createForm");

    formElements.forEach(element=> {
      const errors = runValidationRules(element, this.state.errors);
      this.setState({
          errors: errors
      });
    })

    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const errors =  this.state.errors;
    if (!this.state.errors.email && !this.state.errors.password) {
        // console.log(name,email);
        // Create a new user
        fetch('https://devteamer-backend.herokuapp.com/api/v1/users', {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'POST',
          body: JSON.stringify({
            name: name,
            email_address: email,
          })
        })
        .then(resp => resp.json())
        .then(user => {
          console.log(user)
          if (user.email_address) {
            this.props.addUserToState(user)
            this.props.logThemIn(user.email_address)
            
            console.log("success?", this.state.yrsExp)

            const entries = Object.entries(this.state.yrsExp)
            const entriesMap = entries.filter(e => {
              if (e[1] > 0) {
                return e;
              }
              return null;
            })
            console.log(entriesMap)
            entriesMap.forEach(e => {
              fetch('https://devteamer-backend.herokuapp.com/api/v1/user_roles', {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify({
                  user_id: user.id,
                  role_id: OPTIONS.indexOf(e[0])+1,
                  name: e[0],
                  years_exp: e[1]
                })
              })
              .then(resp => resp.json())
              .then(role => {
                this.props.addUserRoleToState(role)
                console.log("entriesMap: ", role)
              })
            })
          }
          else console.log("error with then...");
        })
    } else {
        console.log(email, password, errors);
    }
  }

  render() {
    // console.log("NewUser State: ", this.state.checkboxes.Developer)
    return (
      <>
        <Container className="create-container">
          <h4>Create a new user</h4>
          {this.renderRedirect()}
              <Form id='createForm' method="post" onSubmit={this.handleCreateUserFormSubmit}>
              <div className="login-row">
                  <Label>Name</Label>
                  <Input 
                      className="input"
                      type="text"
                      validations={['required']}
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      id="name"
                      placeholder="Please enter your name."
                    />
                </div>
                <div className="login-row">
                  <Label>Email</Label>
                  <Input 
                      className="input"
                      type="text"
                      validations={['required','isEmail']}
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      id="email"
                      placeholder="Please enter your email address."
                    />
                </div>
                <div className="login-row">
                  <Label>Password</Label>
                  <Input
                      className="input"
                      type="password"
                      validations={['required']}
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      id="password"
                      placeholder="Please enter your password."
                  />
                </div>
                <FromValidationError field={this.state.errors.email} />
                <FromValidationError field={this.state.errors.password} />
                <CheckboxGroup  isSelected={this.isOptionSelected} 
                                roleOptions={OPTIONS}
                                onCheckboxChange={this.handleCheckboxChange}
                                onInputChange={this.handleInputChange}
                                onYrsExpChange={this.handleYrsExpChange}
                                state={this.state}
                />
                <div className="form-group mt-2">
                  <Button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={this.selectAll}
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={this.deselectAll}
                  >
                    Deselect All
                  </Button>
                  <Button type="submit" className="btn btn-primary">
                    Save
                  </Button>
                </div>
                <Button onClick={this.setRedirect} className="btn btn-primary">
                  back to Login
                </Button>
              </Form>
        </Container>
      </>
    );
  }
}

const FromValidationError = props => (
  <Fade in={Boolean(props.field)}  tag="p" className="error">
    { props.field ? Object.values(props.field).shift() : '' } 
  </Fade>
);

export default NewUser;
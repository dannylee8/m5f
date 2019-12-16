import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Redirect } from 'react-router-dom'
import Checkbox from "./Checkbox";

const OPTIONS = [
  "Developer",
  "Product Owner",
  "Project Manager",
  "Scrum Master",
  "Architect",
  "UX/UI",
  "DevOps",
  "QA"
];

class NewUser extends Component {
  state = {
    redirect: false,
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
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

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = option => (
    <tr key={option}>
      <td>
        <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
        />
      </td>
    </tr>
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    // console.log("NewUser State: ", this.state.checkboxes)
    return (
      <div className="container">
        {this.renderRedirect()}
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              <InputGroup size="sm" key="username" className="mb-3 new-user-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup size="sm" key="email_address" className="mb-3 new-user-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1"><span role="img" aria-label="email">📧</span></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <table className="new-user-table">
                <tbody>
                 {this.createCheckboxes()}
                </tbody>
              </table>
              <div className="form-group mt-2">

                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
                <button onClick={this.setRedirect} className="btn btn-primary">
                  back to Login
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;
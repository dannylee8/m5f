import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import UserInputs from "./UserInputs";
import CheckboxGroup from "./CheckboxGroup";

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

  isOptionSelected = option => {
    return this.state.checkboxes[option]
  }

  render() {
    console.log("NewUser State: ", this.state.checkboxes.Developer)
    return (
      <div className="container">
        {this.renderRedirect()}
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>

              <UserInputs />

              <CheckboxGroup  isSelected={this.isOptionSelected} 
                              roleOptions={OPTIONS}
                              onCheckboxChange={this.handleCheckboxChange}
              />


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
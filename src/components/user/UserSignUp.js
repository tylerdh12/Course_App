import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

// This component provides the "Sign Up" screen by rendering a form that allows a
// user to sign up by creating a new account. The component also renders a "Sign Up"
// button that when clicked sends a POST request to the REST API's /api/users route
// and signs in the user. This component also renders a "Cancel" button that returns
// the user to the default route (i.e. the list of courses).

export default class UserSignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: []
  };

  // On input change set the state of the values
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  // submit handler
  submit = () => {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    //new user payload to be passed to the create user function in Data.js being passed thru context
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    };

    // Passes above payload to create user function in Data.js then returns errors if any.
    this.props.context.data
      .createUser(user)
      .then(errors => {
        if (errors.length > 0) {
          this.setState({ errors });
        } else {
          // Sign us in if there are no errors and send to root dir
          this.props.context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/");
          });
        }
      })
      .catch(err => {
        // handle rejected promises
        console.log(err);
        // this.props.history.push("/error"); //push to history stack
      });
  };

  // Cancel button handler return to root dir
  cancel = () => {
    this.props.history.push("/"); // redirect to main page
  };

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            // Button event handlers
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            // Form elements to be rendered
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={this.state.emailAddress.toLowerCase()}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.change}
                  placeholder="Password"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password"
                />
              </React.Fragment>
            )}
          />
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

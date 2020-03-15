import React from "react";
import Form from "./Form";
import config from "../../config";

// This component provides the "Create Course" screen by rendering a form that
// allows a user to create a new course. The component also renders a
// "Create Course" button that when clicked sends a POST request to the
// REST API's /api/courses route. This component also renders a "Cancel"
// button that returns the user to the default route (i.e. the list of courses).

export default class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      title: "",
      userId: this.props.context.authenticatedUser.userId,
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      firstName: this.props.context.authenticatedUser.firstName,
      lastName: this.props.context.authenticatedUser.lastName,
      emailAddress: this.props.context.authenticatedUser.emailAddress
    };
  }

  // Sets the state of the values entered into the textboxes
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  // Submit Event Handler
  submit = () => {
    fetch(`${config.apiBaseUrl}/courses`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            this.state.emailAddress +
              ":" +
              this.props.context.authenticatedUser.password
          )
      }
    })
      .then(async res => {
        if (res.status === 201) {
          this.props.history.push("/");
        } else if (res.status === 500 || 400) {
          let data = await res.json();
          let errors = data.errors;
          this.setState({ errors: errors });
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        // handle rejected promises
        console.log(err.message);
        this.props.history.push("/error"); //push to history stack
      });
  };

  // Cancel Event Handler
  cancel = () => {
    this.props.history.push("/"); // redirect to main page
  };

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        className="input-title course--title--input"
                        id="title"
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.change}
                        placeholder="Title"
                      />
                      <p>
                        By: {this.state.firstName} {this.state.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="textarea"
                        value={this.state.description}
                        onChange={this.change}
                        placeholder="Course description..."
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={this.state.estimatedTime}
                            onChange={this.change}
                            placeholder="Hours"
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materials"
                            name="materialsNeeded"
                            type="textarea"
                            value={this.state.materialsNeeded}
                            onChange={this.change}
                            placeholder="Materials"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
}

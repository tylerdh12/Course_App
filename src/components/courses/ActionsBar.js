import React from "react";
import config from "../../config";
import { useHistory } from "react-router-dom";

// courses navigation inside course details
//
const ActionBar = props => {
  let history = useHistory();
  const authUser = props.context.authenticatedUser;

  // Delete Handler
  function handleDelete(event) {
    event.preventDefault();
    courseDelete(props);
  }

  // Delete Course function takes props
  async function courseDelete(props) {
    await fetch(`${config.apiBaseUrl}/courses/${props.courseId}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization:
          "Basic " +
          btoa(
            props.context.authenticatedUser.emailAddress +
              ":" +
              props.context.authenticatedUser.password
          )
      })
    }).then(async res => {
      if (res.ok === true) {
        history.push("/");
      } else if (res.status === 500) {
        history.push("/error");
      } else {
        window.alert("Sorry, could not delete the course!");
      }
    });
  }

  // Check auth if !auth hide update and delete buttons
  function ifAuth(props) {
    if (!authUser) {
      return null;
    } else if (authUser.userId === props.ownerId) {
      return (
        <span>
          <a className="button" href={props.courseId + "/update"}>
            Update Course
          </a>
          <a className="button" href="/" onClick={handleDelete}>
            Delete Course
          </a>
        </span>
      );
    }
  }

  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
          {ifAuth(props)}
          <a className="button button-secondary" href="/">
            Return to List
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;

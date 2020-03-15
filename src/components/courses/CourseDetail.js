import * as React from "react";
import config from "../../config";
import withContext from "./../../Context";

// This component provides the "Course Detail" screen by retrieving the detail
// for a course from the REST API's /api/courses/:id route and rendering the course.
// The component also renders a "Delete Course" button that when clicked should send a
// DELETE request to the REST API's /api/courses/:id route in order to delete a course.
// This component also renders an "Update Course" button for navigating to the
// "Update Course" screen.

// Import Actions--Bar Component
import ActionsBar from "./ActionsBar";
import Details from "./Details";

//Adds context for Auth User to make dynamic buttons for Action Bar
const ActionsBarWithContext = withContext(ActionsBar);

export default class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: null,
      course: [],
      owner: [],
      materialsNeeded: [],
      errors: []
    };
  }

  componentDidMount() {
    this.getCourse();
  }

  // Get Course Function
  async getCourse() {
    let courseIdParen = await this.props.location.pathname;
    let courseId = await courseIdParen.replace("/courses/", "");
    this.setState({
      courseId: courseId
    });

    await fetch(config.apiBaseUrl + "/courses/" + this.state.courseId)
      .then(res => {
        if (res.status === 500) {
          return this.props.history.push("/error");
        } else if (res.status === 404) {
          return this.props.history.push("/notfound");
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data === null) {
          this.props.history.push("/notfound");
        } else {
          this.setState({
            course: data,
            owner: data.owner
          });
        }
      })
      .catch(err => {
        return err;
      });
  }

  render() {
    return (
      <div>
        <ActionsBarWithContext
          courseId={this.state.courseId}
          ownerId={this.state.owner.id}
        />
        <Details
          course={this.state.course}
          owner={this.state.owner}
          key={this.state.course.id}
        />
      </div>
    );
  }
}

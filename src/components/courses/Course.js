import * as React from "react";

export default class Course extends React.Component {
  render() {
    return (
      <div className="grid-33">
        <a
          className="course--module course--link"
          href={"courses/" + this.props.id}
        >
          <h4 className="course--label">Course</h4>
          <h4 className="course--title">{this.props.title}</h4>
        </a>
      </div>
    );
  }
}

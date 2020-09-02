import React from "react";
import config from "../../config";
import Course from "./Course";

const Courses = ({ navigation }) => {
  const [courses, updateCourses] = React.useState([]);
  const [errors, updateErrors] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(config.apiBaseUrl + "/courses")
      .then((res) => {
        if (res.status === 500) {
          updateErrors("500");
          errors && console.log(errors);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        updateCourses(data);
        setLoading(false);
      });
  }, [navigation, errors]);

  return loading ? (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: 24, color: "grey" }}>
        Loading . . .
      </h1>
    </div>
  ) : (
    <div className="bounds">
      {courses.map((course) => (
        <Course title={course.title} id={course.id} key={course.id} />
      ))}
      <div className="grid-33">
        <a className="course--module course--add--module" href="courses/create">
          <h3 className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </a>
      </div>
    </div>
  );
};

export default Courses;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import Components
import Header from "./components/Header";
import PrivateRoute from "./PrivateRoute";
import UserDetails from "./components/user/UserDetails";
import Courses from "./components/courses/Courses";
import CreateCourse from "./components/courses/CreateCourse";
import UpdateCourse from "./components/courses/UpdateCourse";
import CourseDetail from "./components/courses/CourseDetail";
import UserSignUp from "./components/user/UserSignUp";
import UserSignIn from "./components/user/UserSignIn";
import UserSignOut from "./components/user/UserSignOut";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";

//Import With Context
import withContext from "./Context";

// Connect Course to context
const HeaderWithContext = withContext(Header);
const UserDetailsWithContext = withContext(UserDetails);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          {/* This Component will load the Courses and show them using the Courses Component  */}
          <Route exact path="/" component={CoursesWithContext} />
          <PrivateRoute path="/settings" component={UserDetailsWithContext} />
          {/* <PrivateRoute path="/settings" component={AuthWithContext} /> */}
          <PrivateRoute
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <PrivateRoute path="/signout" component={UserSignOutWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

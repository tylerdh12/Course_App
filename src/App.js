import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseDetail from "./components/courses/CourseDetail";
import Courses from "./components/courses/Courses";
import CreateCourse from "./components/courses/CreateCourse";
import UpdateCourse from "./components/courses/UpdateCourse";
import Forbidden from "./components/Forbidden";
// Import Components
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";
import UserDetails from "./components/user/UserDetails";
import UserSignIn from "./components/user/UserSignIn";
import UserSignOut from "./components/user/UserSignOut";
import UserSignUp from "./components/user/UserSignUp";
//Import With Context
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

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

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
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

export default App;

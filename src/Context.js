import React from "react";
// Allows us to save cookies for User Login
import Cookies from "js-cookie";
// Import the data Connection
import Data from "./Data";
// Allows us to access props thru context
const Context = React.createContext();

export class Provider extends React.Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      // Allows us to use the authUser data
      authenticatedUser,
      // Sets this State
      data: this.data,
      actions: {
        // Sign In function thru Actions
        signIn: this.signIn,
        // Sign Out function thru Actions
        signOut: this.signOut,
        // Get Courses function thru Actions
        getAllCourses: this.getAllCourses,
        // Create Course function thru Actions
        createCourse: this.createCourse,
        // Delete Course function thu Actions
        deleteCourse: this.deleteCourse
      }
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  // Sign In Function
  signIn = async (emailAddress, password) => {
    // Gets user from DB
    const user = await this.data.getUser(emailAddress, password);
    // Checks for user returned
    if (user !== null) {
      // Sets state to contain the user
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
    }
    // Returns user Obj
    return user;
  };

  // Sign Out Function
  signOut = () => {
    // Removes state of the user Obj
    this.setState(() => {
      return { authenticatedUser: null };
    });
    Cookies.remove("authenticatedUser");
    Cookies.remove("password");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

// Allows us to pass in components to use Context
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

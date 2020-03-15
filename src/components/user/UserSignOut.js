import React from "react";
import { Redirect } from "react-router-dom";

// Sign out component calls actions signout function then redirects to root dir
const signOut = ({ context }) => {
  context.actions.signOut();
  return <Redirect to="/" />;
};
export default signOut;

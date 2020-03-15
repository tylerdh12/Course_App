import React from "react";

// Currently this component is not being used
export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
    <div className="bounds">
      <div>
        <h1>
          Welcome, {authUser.firstName} {authUser.lastName}!
        </h1>
        <div className="settings-menu">
          <h2>Settings</h2>
          <br />
          <p>Username: {authUser.emailAddress}.</p>
        </div>
      </div>
    </div>
  );
};

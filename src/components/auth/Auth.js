import React from "react";
import Login from "./Login";
import Register from "./Register";

export default ({ toggle }) => {
  return (
    <>
      <h1 className="welcome">Welcome to Pantry Pal</h1>
      <div className="authContainer">
        <Login toggle={toggle} />
      </div>
    </>
  );
};

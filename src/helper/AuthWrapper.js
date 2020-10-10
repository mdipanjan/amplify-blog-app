import React, { Component } from "react";
import { SignIn } from "../components/SignIn";
export class AuthWrapper extends Component {
  render() {
    return (
      <div>
        <SignIn />
      </div>
    );
  }
}

export default AuthWrapper;

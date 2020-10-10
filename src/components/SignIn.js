import React, { Component } from "react";

export class SignIn extends Component {
  render() {
    return (
      <div className="mx-auto ">
        <form className="">
          <div className="mb-4">
            <label className="" htmlFor="username">
              Username
            </label>
            <input
              className=""
              id="username"
              key="username"
              name="username"
              // onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
          </div>
          .....omitted.....
        </form>
      </div>
    );
  }
}

export default SignIn;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { Auth } from "aws-amplify";

Amplify.configure(awsconfig);

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signUp",
};

function App() {
  const [formState, updateFormState] = useState(initialFormState);
  let { formType } = formState;
  function handleChange(e) {
    updateFormState({ ...formState, [e.target.name]: e.target.value });
  }
  async function handleSignUpSubmit(e) {
    e.preventDefault();
    let { username, password, email } = formState;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        {formType === "signUp" && (
          <form
            className="mt-5"
            onSubmit={(e) => {
              handleSignUpSubmit(e);
            }}
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name"
                name="username"
                value={formState.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formState.email}
                placeholder="Enter email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formState.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Auth } from "@aws-amplify/auth";

Amplify.configure(awsconfig);

const initialFormState = {
  username: "",
  password: "",
  email: "",
  code: "",
  formType: "signIn",
};

function App() {
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  let { formType } = formState;

  useEffect(() => {
    getCurrentUserstatus();
  }, []);
  const getCurrentUserstatus = async () => {
    try {
      let userStat = await Auth.currentAuthenticatedUser();
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
      console.log(userStat);
    } catch (err) {
      console.log(err);
    }
  };
  async function checkUser() {
    try {
      let user = await API.currentAuthenticatedUser();
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }
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
      updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function handleConfirmSignup(e) {
    e.preventDefault();

    let { formType, username, code } = formState;
    try {
      await Auth.confirmSignUp(username, code);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();

    let { username, password, email } = formState;
    try {
      const user = await Auth.signIn(username, password);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (error) {
      console.log("error signing in", error);
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
        {formType === "confirmSignUp" && (
          <form
            onSubmit={(e) => {
              handleConfirmSignup(e);
            }}
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Entre your code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your code"
                name="code"
                value={formState.code}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Verify
            </button>
          </form>
        )}
        {formType === "signIn" && (
          <form
            className="mt-5"
            onSubmit={(e) => {
              handleSignIn(e);
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
        {formType === "signedIn" && <h1>Inside App! Hello world</h1>}
      </div>
    </div>
  );
}

export default App;

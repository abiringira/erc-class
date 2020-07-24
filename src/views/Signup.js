import React, { Component } from "react";
import "../shards-dashboard/styles/index.css";
import Dashboard from "./Dashboard";
import Error from "../components/topup-message/Error";
import Success from "../components/topup-message/Success";
// import axios from "axios";
import Api from "../Api";

import { Redirect, Link } from "react-router-dom";
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      phone: null,
      name: null,
      passwordCreation: null,
      redirect: false,
      token: null,
      code: null
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  onClose = code => {
    this.setState({ ["is" + code]: false });
  };

  postSignUp = async e => {
    e.preventDefault();

    try {
      const res = await Api.signup({
        email: this.state.email,
        mobile: this.state.phone,
        name: this.state.name,
        password: this.state.passwordCreation
      });

      if (res.success) {
        console.log(JSON.stringify(res, 2, null));
        this.setState({ is201: true, code: 201 });
      } else if (res.message === "Phone number already in use!") {
        this.setState({ isInvalidPhone: true });
      } else {
        this.setState({ is400: true, code: 400 });
      }
    } catch (error) {
      this.setState({ is400: true, code: 400 });
      console.log(error.message);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="body1">
          <div className="App-login1">
            <div className="container1" id="container1">
              <div className="form-container1 sign-in-container1">
                <div className="social-container1">
                  <img
                    id="main-logo"
                    style={{ maxWidth: "210px" }}
                    src={require("../images/avatars/logoerc.png")}
                    alt="logo"
                  />
                </div>
                <br></br> <br></br> <br></br>
                <div className="centered-div">
                  <a href="/login" className="button-signup">
                    Back to Login{" "}
                  </a>
                </div>
                {/* <h1>Sign in</h1> */}
                {/* <a href="hhtp/social">Forgot your password?</a> */}
                {/*                   
                    <a href="/login" className="button-signup">Sign In </a> */}
              </div>

              <div className="overlay-container1">
                <div className="overlay">
                  <div className="overlay-panel overlay-right">
                    {this.state.code === 201 ? (
                      <Success
                        code={this.state.code}
                        open={this.state["is" + this.state.code]}
                        title="Success"
                        message="User Registered Successfully!! Login to start"
                        onClose={this.onClose}
                      />
                    ) : (
                      <Error
                        code={this.state.code}
                        open={this.state["is" + this.state.code]}
                        title={
                          this.state.is400 ? "Input Format" : "Validation Error"
                        }
                        message={
                          this.state.is400
                            ? "Please enter a valid email or a valid phone number format: 07XXXXXXXX"
                            : "Phone number already in use!"
                        }
                        onClose={this.onClose}
                      />
                    )}
   
                    <form onSubmit={this.postSignUp} className="form1">
                      <h1>Sign Up</h1>

                      <input
                        className="input1"
                        type="email"
                        placeholder="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <input
                        className="input1"
                        type="number"
                        placeholder="Phone"
                        onChange={e => this.setState({ phone: e.target.value })}
                      />
                      <input
                        className="input1"
                        type="text"
                        placeholder="name"
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                      <input
                        className="input1"
                        type="password"
                        placeholder="Password"
                        onChange={e =>
                          this.setState({ passwordCreation: e.target.value })
                        }
                      />
                      <br></br>
                      <button className="button1">Sign up</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <MainFooter/> */}
      </React.Fragment>
    );
  }
}

export default SignupPage;

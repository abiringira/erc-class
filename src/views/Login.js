import React, { Component } from "react";
import "../shards-dashboard/styles/index.css";
import Dashboard from "./Dashboard";
import axios from "axios";
import Api from "../Api";

import { Redirect, Link } from "react-router-dom";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      email: null,
      phone: null,
      name: null,
      passwordCreation: null,
      redirect: false,
      token: null
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  getDashboard = () => {
    console.log("dfghsdjkghsg");
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  postLogin = async e => {
    e.preventDefault();
    console.log("Success:", this.state.login);
     try {
       await Api.login({
        login: this.state.login,
        password: this.state.password
      });
     
      this.setRedirect();

       
     } catch (error) {
      console.log(error.message);
       
     }
    // try {
    //   const res = await axios({
    //     method: "POST",
    //     url: "https://www.smart-investment.club/ercapi/api/auth/signin",
    //     headers: {
    //       "API-VERSION": 1.0,
    //       "Application-key": "a6cb5c9ce88b59ee360587f0459bcb37fe8895c9",
    //       "Content-Type": "application/json"
    //     },
    //     data: {
    //       login: this.state.login,
    //       password: this.state.password
    //     }
    //   });
    //   if (res.status === 200) {
    //     console.log(res.status);
    //   this.setRedirect();
    //   this.setState({token : res.accessToken})

    //   }
    //   return <LoginPage />;
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  postSignUp = async e => {
    e.preventDefault();
    console.log("Success:", this.state.login);

    try {
      const res = await axios({
        method: "POST",
        url: "https://www.smart-investment.club/ercapi/api/auth/signup",
        headers: {
          "API-VERSION": 1.0,
          "Application-key": "a6cb5c9ce88b59ee360587f0459bcb37fe8895c9",
          "Content-Type": "application/json"
        },
        data: {
          email: this.state.email,
          mobile: this.state.phone,
          name: this.state.name,
          password: this.state.passwordCreation
        }
      });
      if (res.status === 200) {
        console.log(res.status);
        return <Dashboard token={this.state.token} />;
      }
      return <LoginPage />;
    } catch (error) {
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
                {this.getDashboard()}
                <form className="form1" onSubmit={this.postLogin}>
                  <div className="social-container1">
                    <img
                      id="main-logo"
                      style={{ maxWidth: "210px" }}
                      src={require("../images/avatars/logoerc.png")}
                      alt="logo"
                    />
                  </div>
                  <h1>Sign in</h1>

                  <input
                    className="input1"
                    type="text"
                    onChange={e => this.setState({ login: e.target.value })}
                    placeholder="Email/Phone"
                  />
                  <input
                    className="input1"
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="Password"
                  />
                  {/* <a href="hhtp/social">Forgot your password?</a> */}
                  <button type="submit" className="button1">
                    <a className="a1">Sign In </a>
                  </button>
                </form>
              </div>

              <div className="overlay-container1">
                <div className="overlay">
                  <div className="overlay-panel overlay-right">
                    <h1 className="login-header1">Create Account</h1>

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

export default LoginPage;

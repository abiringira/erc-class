import React, { Component } from "react";
import "../shards-dashboard/styles/index.css";
import Error from "../components/topup-message/Error";
import Success from "../components/topup-message/Success";
// import axios from "axios";
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

  getDashboard = () => {
    console.log("dfghsdjkghsg");
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  postLogin = async e => {
    e.preventDefault();

    try {
      const res = await Api.login({
        login: this.state.login,
        password: this.state.password
      });
      console.log(JSON.stringify(res.error, 2, null));
      if (res.accessToken) {
        this.setState({ is200: true, code: 200 });
        this.setRedirect();
      }
    } catch (error) {
      this.setState({ is401: true, code: 401 });
      console.log(error);
    }
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
      if (res.accessToken) {
        this.setState({ is201: true, code: 201 });
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
                {this.state["is" + this.state.code] &&
                this.state.code === 200 ? (
                  this.getDashboard()
                ) : (
                  <Error
                    code={this.state.code}
                    open={this.state["is" + this.state.code]}
                    title= "Invalid Credentials"                      
                    message= "Enter valid email/password"
                    onClose={this.onClose}
                  />
                )}
                <form className="form1" >
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
                  <br></br> 
                  <button onClick={this.postLogin}  className="button1">
                    <a className="a1">Sign In </a>
                  </button>
                </form>
              </div>
  
              <div className="overlay-container1">
                <div className="overlay">
                  <div className="overlay-panel overlay-right">
                   
                  <h1 >New User</h1>
                  <br></br>
                  
                    <a  href="/signup" className="button-signup">Create Account </a>
                  
                

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

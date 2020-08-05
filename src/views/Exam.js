import React, { Component } from "react";
import "../shards-dashboard/styles/index.css";
import Error from "../components/topup-message/Error";
import Success from "../components/topup-message/Success";
// import axios from "axios";
import Api from "../Api";

import { Redirect, Link } from "react-router-dom";
class ExamPage extends Component {
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
        
      </React.Fragment>
    );
  }
}

export default ExamPage;

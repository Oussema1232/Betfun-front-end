import React from "react";
import Joi from "joi-browser";
import http from "../../services/httpService";
import auth from "../../services/authService";
import Form from "../../commun/form";
import Betfunlogo from "../../commun/logos/betfunalllogo";

import "./style.css";

class Login extends Form {
  state = {
    data: { email: "", userpassword: "" },
    errors: {},
    forbidden: false,
    emailtoken: "",
    message: "",
    showmessage: false,
  };

  schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    userpassword: Joi.string().required().min(5).label("userpassword"),
  };

  sendrequest = async () => {
    this.setState({ message: "", showmessage: false });

    try {
      const response = await http.post(
        `http://localhost:3001/api/loginconfirmation/${this.state.emailtoken}`
      );
      this.setState({ message: response.data.message, showmessage: true });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          showmessage: true,
        });
      }
    }
  };

  dosubmit = async () => {
    try {
      const { email, userpassword } = this.state.data;
      await auth.login(email, userpassword);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = err.response.data;
        this.setState({ errors });
      } else if (err.response && err.response.status === 403) {
        this.setState({ emailtoken: err.response.data.data, forbidden: true });
      }
    }
  };
  render() {
    return (
      <div
        style={{
          backgroundColor: "#e9eac9",
          width: "100%",
          height: "100vh",
          paddingBottom: 10,
          paddingLeft: "30%",

          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Betfunlogo />
        <div style={{ width: "30%", minWidth: 250 }}>
          {!this.state.forbidden ? (
            <form
              style={{
                width: "100%",
                // border: "1px solid red",
                paddingTop: 6,
                paddingBottom: 6,
                marginTop: 20,
              }}
            >
              {this.renderInput("email", "", "", "textclass", "errorclass")}

              {this.renderInput(
                "userpassword",
                "",
                "",
                "textclass",
                "errorclass",
                "password"
              )}

              {this.renderButton("Login", "buttonclass")}
            </form>
          ) : (
            <div>
              {!this.state.showmessage ? (
                <div>
                  <div>
                    You are trying to login with an non confirmed account.
                    please verify your email for a validation link. If you don't
                    find it in you inbox check your spam. otherwise click on the
                    button bellow to resend it
                  </div>
                  <button onClick={this.sendrequest}>Resend link</button>
                </div>
              ) : (
                <h1>{this.state.message}</h1>
              )}

              <button
                onClick={() => {
                  this.setState({
                    forbidden: false,
                    showmessage: false,
                    emailtoken: "",
                  });
                }}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;

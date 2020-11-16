import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import auth from "../../services/authService";
import Form from "../../commun/form";
import Betfunlogo from "../../commun/logos/betfunalllogo";
import LoadingComponent from "../../commun/logos/loadingcomponent";
import Input from "../../commun/input";

import "./style.css";

class Login extends Form {
  state = {
    data: { email: "", userpassword: "" },
    errors: {},
    slasheye: true,
    forbidden: false,
    emailtoken: "",
    message: "",
    showemail: false,
    showmessage: false,
    loading: false,
  };

  schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    userpassword: Joi.string().required().min(5).label("Password"),
  };

  sendrequest = async () => {
    this.setState({
      message: "",
      showmessage: false,
      showemail: false,
      loading: false,
    });

    try {
      const response = await http.get(
        `http://localhost:3001/api/loginconfirmation/${this.state.emailtoken}`
      );
      this.setState({
        message: response.data.message,
        showmessage: true,
        showemail: true,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          showmessage: true,
        });
      }
    }
  };

  showpassword = () => {
    this.setState({ slash: !this.state.slash });
  };

  dosubmit = async () => {
    try {
      this.setState({ loading: true });
      const { email, userpassword } = this.state.data;
      await auth.login(email, userpassword);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      this.setState({ loading: false });
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
      <>
        <LoadingComponent show={this.state.loading} />
        <div
          style={{
            backgroundColor: "#e9eac9",
            width: "100%",

            minHeight: "100vh",
            height: "100%",
            paddingBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!this.state.forbidden && <Betfunlogo />}
          <div
            style={{
              width: !this.state.showmessage ? "27.3%" : "70%",
              minWidth: !this.state.showmessage ? 250 : 300,

              backgroundColor: "#f5f5e5",
              marginTop: !this.state.showmessage ? 20 : 70,
              padding: 10,
              borderRadius: 3,
              boxShadow: "0px 0px 3px 4px #dddfad",
            }}
          >
            {!this.state.forbidden ? (
              <form
                style={{
                  width: "100%",
                  // border: "1px solid red",
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
              >
                {this.renderInput(
                  "email",
                  "",
                  "email",
                  "",
                  "textclass",
                  "errorclass"
                )}
                {this.renderInput(
                  "userpassword",
                  "",
                  "password",
                  "",
                  "textclass",
                  "errorclass",
                  true,

                  this.state.slasheye ? "password" : "text"
                )}

                {this.renderButton("Log In", "buttonclass")}
                <Link
                  style={{
                    fontSize: 13,
                    color: "blue",
                    textDecoration: "none",
                    marginTop: 10,
                    userSelect: "none",
                    color: "#1769aa",
                    display: "block",
                    marginTop: 12,
                    fontWeight: "bold",
                  }}
                  to="/account/checkemail"
                >
                  Forget Password?
                </Link>
              </form>
            ) : (
              <div>
                {!this.state.showmessage ? (
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      You are trying to login with an non confirmed account.
                      please verify your email for a validation link. If you
                      don't find it in you inbox check your spam. otherwise
                      click on the button bellow to resend it
                    </div>
                    <button className="resendlink" onClick={this.sendrequest}>
                      Resend link
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ marginLeft: 20 }}>{this.state.message}</h3>
                    {this.state.showemail && (
                      <h4>
                        Please check {this.state.data.email} for a validation
                        link..
                      </h4>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          {!this.state.forbidden ? (
            <Link
              to="/register"
              style={{ textDecoration: "none", userSelect: "none" }}
            >
              <button className="sidebuttonclass">Sign Up</button>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button
                onClick={() => {
                  this.setState({
                    forbidden: false,
                    showmessage: false,
                    showemail: false,
                    emailtoken: "",
                  });
                }}
                className="sidebuttonclass"
              >
                Back To Login
              </button>
            </Link>
          )}
        </div>
      </>
    );
  }
}

export default Login;

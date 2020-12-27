import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import auth from "../../services/authService";
import { savecurrentUser } from "../../features/currentuser/currentuserSlice";
import Form from "../../commun/form";
import Betfunlogo from "../../commun/logos/betfunalllogo";
import LoadingComponent from "../../commun/logos/loadingcomponent";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import Input from "../../commun/input";

import "./style.css";

class Login extends Form {
  state = {
    data: { email: "", userpassword: "" },
    errors: {},
    slasheye: true,
    forbidden: false, //if forbidden then we show that you wanna login with non confirmed email
    emailtoken: "", //we save the email token when the data is correct but the account is nonconfirmed
    message: "", //message when we send request to send a verification email if you click on resend button
    showemail: false, //becomes true if the request is successful we tell you to go check your email
    showmessage: false, //if true we show response message
    loadinglogin: false,
    loadingresend: false,
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
      loadingresend: true,
    });

    try {
      const response = await http.get(
        `http://localhost:3001/api/loginconfirmation/${this.state.emailtoken}`
      );
      this.setState({
        message: response.data.message,
        showmessage: true,
        showemail: true,
        loadingresend: false,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          showmessage: true,
        });
      }
      this.setState({ loadingresend: false });
    }
  };

  showpassword = () => {
    this.setState({ slash: !this.state.slash });
  };

  dosubmit = async () => {
    try {
      this.setState({ loadinglogin: true });
      const { email, userpassword } = this.state.data;
      await auth.login(email, userpassword);
      this.props.savecurrentUser();
      this.props.history.replace("/");
    } catch (err) {
      this.setState({ loadinglogin: false });
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = err.response.data;
        this.setState({ errors });
      } else if (err.response && err.response.status === 403) {
        this.setState({ emailtoken: err.response.data.data, forbidden: true });
      }
      this.setState({ loadinglogin: false });
    }
  };
  render() {
    return (
      <>
        <LoadingComponent show={this.state.loadinglogin} />
        <div
          style={{
            backgroundColor: "#ede5e5",
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
                      {!this.state.loadingresend ? (
                        "Resend"
                      ) : (
                        <Spincrescentcomponenet color="#e9eac9" size="1x" />
                      )}
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

const mapDispatchToProps = { savecurrentUser };

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//send request to login confirmation if we click on resend so it sendsus the user a mail to cofirm his account
//endpoint sendverificationmail
//when clicking on link sent it sends us to the component registerconfirmation

//if you click on forget password it sends you to an other component whicj is checkemailreset

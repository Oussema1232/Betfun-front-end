import React from "react";
import Joi from "joi-browser";
import http from "../../services/httpService";
import _ from "lodash";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import Form from "../../commun/form";

import "./style.css";

export default class Checkemail extends Form {
  state = {
    data: { email: "" },
    loading: false,
    errors: {},
    message: "",
    showmessage: false,
    showemail: false,
  };

  schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
  };

  dosubmit = async () => {
    this.setState({
      message: "",
      showmessage: false,
      showemail: false,
      loading: true,
    });

    try {
      const response = await http.get(
        `http://localhost:3001/api/checkemail/${this.state.data.email}`
      );
      this.setState({
        message: response.data.message,
        showmessage: true,
        showemail: true,
        loading: false,
      });
    } catch (err) {
      this.setState({ loading: false });
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          showmessage: true,
        });
      }
    }
  };

  render() {
    const { showemail, data } = this.state;
    return (
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
          {!this.state.showmessage ? (
            <>
              <h4>
                Type down your email to recieve a verfication link so you can
                reset your password 
              </h4>
              <form
                style={{
                  width: "100%",
                  // border: "1px solid red",

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

                {this.renderButton(
                  !this.state.loading ? "Send" : <Spincrescentcomponenet />,
                  "resendlink"
                )}
              </form>
            </>
          ) : (
            <>
              <h3 style={{ marginLeft: 20 }}>{this.state.message}</h3>
              {showemail && (
                <h4>Please check {data.email} for a validation link..</h4>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

//sends request to endpoint emailreset verification if it's allright it sends link to the user on this email
//when clicking on the link it opens component resetpassword

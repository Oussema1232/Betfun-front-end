import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import http from "../../services/httpService";
import auth from "../../services/authService";
import { savecurrentUser } from "../../features/currentuser/currentuserSlice";
import Form from "../../commun/form";

import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

import "../logcomponents/style.css";

class Usernameparams extends Form {
  state = {
    data: { username: "" },
    errors: {},
    successmessage: "",
    loading: false,
  };

  schema = {
    username: Joi.string().required().min(5).label("Username"),
  };

  dosubmit = async () => {
    try {
      this.setState({ loading: true });
      const { username } = this.state.data;
      const response = await http.put(
        `http://localhost:3001/api/params/username`,
        {
          username,
        }
      );
      auth.loginWithjwt(response.data.token);
      this.props.savecurrentUser();
      this.setState({
        successmessage: response.data.message,
        loading: false,
        username: "",
      });
    } catch (err) {
      this.setState({ loading: false });
      if (err.response) {
        const errors = {
          ...this.state.errors,
          message: err.response.data.message,
        };
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 10,
          boxSizing: "border-box",
          minWidth: 200,
          alignItems: "center",
          border: "1px solid #d4d4d3",
          boxShadow: "0px 0px 3px 4px #d4d4d3",
          backgroundColor: "#fbfbfb",
        }}
      >
        <h5>Change your Username</h5>
        <form
          style={{
            width: "100%",

            padding: 6,
          }}
        >
          {this.renderInput(
            "username",
            "",
            "username",
            "",
            "textclass",
            "errorclass"
          )}
          {this.renderButton(
            !this.state.loading ? (
              "Change"
            ) : (
              <Spincrescentcomponenet size="1x" color="#fbfbfb" />
            ),
            "resendlink"
          )}

          {this.state.errors.message && (
            <div className="errorclass" style={{ marginTop: 5 }}>
              {this.state.errors.message}
            </div>
          )}
          {this.state.successmessage && !this.state.loading && (
            <div
              className="errorclass"
              style={{ color: "#07617d", marginTop: 5 }}
            >
              {this.state.successmessage}
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { savecurrentUser };

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Usernameparams);

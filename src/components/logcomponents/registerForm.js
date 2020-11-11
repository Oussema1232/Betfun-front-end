import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { addUser } from "../../features/users/userSlice";
import { loadCountries } from "../../features/countries/countrySlice";
import Form from "../../commun/form";
import Betfunlogo from "../../commun/logos/betfunalllogo";

import "./style.css";

class Register extends Form {
  state = {
    data: { email: "", username: "", userpassword: "", countryId: "" },
    check: false,
    errors: {},
  };

  componentDidMount() {
    this.props.loadCountries();
  }

  schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    username: Joi.string().required().min(3).label("Username"),
    userpassword: Joi.string().required().min(5).label("Password"),
    countryId: Joi.number()
      .integer()
      .required()
      .error(() => {
        return {
          message: "You have to select a country",
        };
      })
      .label("Country"),
  };

  dosubmit = () => {
    this.setState({ check: true });
    if (_.size(this.state.errors) < 1) {
      const user = this.state.data;
      this.props.addUser(user);
    }
  };
  render() {
    const countries = this.props.countries;
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
          alignItems: "flex-start",
          paddingLeft: "30%",
        }}
      >
        <Betfunlogo />
        <div style={{ width: "30%", minWidth: 250 }}>
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
            {this.props.addUserErrors.message &&
              _.size(this.state.errors) < 1 &&
              this.state.check === true && (
                <div>{this.props.addUserErrors.message}</div>
              )}
            {this.renderInput("username", "", "", "textclass", "errorclass")}
            {this.renderInput(
              "userpassword",
              "",
              "",
              "textclass",
              "errorclass",
              "password"
            )}
            {this.renderSelect(
              countries,
              "countryId",
              "",
              "selectcontainerclass",
              "selectclass",
              "errorclass"
            )}
            {this.renderButton("Sign up", "buttonclass")}
            {/* <NavLink to="/login">
              <button>Login</button>
            </NavLink> */}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { addUser, loadCountries };

const mapStateToProps = (state) => ({
  countries: state.betfundata.countries.list,
  addUserErrors: state.betfundata.users.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { addUser } from "../../features/users/userSlice";
import { loadCountries } from "../../features/countries/countrySlice";
import Form from "../../commun/form";
import Betfunlogo from "../../commun/logos/betfunalllogo";
import LoadingComponent from "../../commun/logos/loadingcomponent";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

import "./style.css";

class Register extends Form {
  state = {
    data: { email: "", username: "", userpassword: "", countryId: "" },
    check: false,
    slasheye: true,
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
      <>
        <LoadingComponent show={this.props.loadingcountries} />

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
          <Betfunlogo />

          <div
            style={{
              width: "27.3%",
              minWidth: 250,
              backgroundColor: "#f5f5e5",
              marginTop: 20,
              padding: 10,
              borderRadius: 3,
              boxShadow: "0px 0px 3px 4px #dddfad",
            }}
          >
            {!this.props.emailtoken ? (
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
                {this.props.addUserErrors.message &&
                  _.size(this.state.errors) < 1 &&
                  this.state.check === true && (
                    <div className="errorclass">
                      {this.props.addUserErrors.message}
                    </div>
                  )}
                {this.renderInput(
                  "username",
                  "",
                  "username",
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
                {this.renderSelect(
                  countries,
                  "countryId",
                  "",
                  "selectcontainerclass",
                  "selectclass",
                  "errorclass"
                )}
                {this.renderButton(
                  this.props.loadingregister ? (
                    <Spincrescentcomponenet color="#4e0000" />
                  ) : (
                    "Sign Up"
                  ),
                  "buttonclass"
                )}
              </form>
            ) : (
              <>
                <h3 style={{ marginLeft: 20 }}>
                  Congrats you are now a member of Betfun
                </h3>

                <h4>
                  Please check {this.state.data.email} for a validation link..
                </h4>
              </>
            )}
          </div>
          <NavLink to="/login">
            <button className="sidebuttonclass">Log In</button>
          </NavLink>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = { addUser, loadCountries };

const mapStateToProps = (state) => ({
  countries: state.betfundata.countries.list,

  loadcountries: state.betfundata.countries.loading,
  addUserErrors: state.betfundata.users.errors,
  emailtoken: state.betfundata.users.onsuccess.message,
  loadingregister: state.betfundata.users.loading,
  loadingcountries: state.betfundata.countries.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

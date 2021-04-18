import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { addUser } from "../../features/users/userSlice";
import { loadCountries } from "../../features/countries/countrySlice";
import { loadDomains } from "../../features/domains/domainSlice";
import Form from "../../commun/form";
import Betfunlogo from "../../commun/logos/betfunalllogo";
import LoadingComponent from "../../commun/logos/loadingcomponent";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

import "./style.css";

class Register extends Form {
  state = {
    data: {
      email: "",
      username: "",
      userpassword: "",
      countryId: "",
      gender: "",
      domainId: "",
    },
    check: false,
    slasheye: true,
    errors: {},
  };

  componentDidMount() {
    this.props.loadCountries();
    this.props.loadDomains();
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
    domainId: Joi.number()
      .integer()
      .required()
      .error(() => {
        return {
          message: "You have to select a domain",
        };
      })
      .label("Domain"),
    gender: Joi.string().required().label("Gender"),
  };

  dosubmit = () => {
    this.setState({ check: true }); //check is used to check when do submit is trigered that means when errors in local state are emty because when changing inputs check becomes false
    if (_.size(this.state.errors) < 1) {
      const user = this.state.data;
      this.props.addUser(user);
    }
  };
  render() {
    const countries = this.props.countries;
    const domains = this.props.domains;
    return (
      <div className="logscreencontainer">
        <LoadingComponent
          show={this.props.loadingcountries || this.props.loaddomains}
        />
        <div className="betfunalllogocontainer">
          <Betfunlogo />
        </div>
        <div className="formmessagecontainer">
          {!this.props.emailtoken ? (
            <form
              style={{
                width: "100%",

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
                _.size(this.state.errors) < 1 && //this condition can be ignored because if you have check true then errors is already empty
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
                "errorclass",
                "Country"
              )}
              {this.renderSelect(
                [
                  { id: "Male", name: "Male" },
                  { id: "Female", name: "Female" },
                ],
                "gender",
                "",
                "selectcontainerclass",
                "selectclass",
                "errorclass",
                "Gender"
              )}
              {this.renderSelect(
                domains,
                "domainId",
                "",
                "selectcontainerclass",
                "selectclass",
                "errorclass",
                "Domain"
              )}
              {this.renderButton(
                this.props.loadingregister ? (
                  <Spincrescentcomponenet color="#fbfbfb" size="1x" />
                ) : (
                  "Sign Up"
                ),
                "buttonclass"
              )}
            </form>
          ) : (
            <>
              <h3 style={{ marginLeft: 20 }}>Congrats you are now a Bettor</h3>

              <h4>
                Please check {this.state.data.email} for a validation link.
              </h4>
            </>
          )}
        </div>
        <NavLink to="/login">
          <button className="sidebuttonclass">Log In</button>
        </NavLink>
      </div>
    );
  }
}

const mapDispatchToProps = { addUser, loadCountries, loadDomains };

const mapStateToProps = (state) => ({
  countries: state.betfundata.countries.list,
  domains: state.betfundata.domains.list,
  users: state.betfundata.users.list,
  loadcountries: state.betfundata.countries.loading,
  loaddomains: state.betfundata.domains.loading,
  addUserErrors: state.betfundata.users.errors,
  emailtoken: state.betfundata.users.onsuccess.message,
  loadingregister: state.betfundata.users.loading,
  loadingcountries: state.betfundata.countries.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

//when calling users endpoint to post user data if it's allright a email will be send to confirm the email with a token
//the endpoint response is {data:user,message:emailtoken}
//when clicking on the email link you open registerconfirmation component

import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import { connect } from "react-redux";
import { savecurrentUser } from "../../features/currentuser/currentuserSlice";
import Input from "../../commun/input";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

import http from "../../services/httpService";

import "../logcomponents/style.css";

class Passwordparams extends Component {
  state = {
    data: { oldpassword: "", userpassword: "", confirmuserpassword: "" },
    loading: false,
    errors: {},
    successmessage: "",
    reseterror: "",
    check: false,
    slashpassword: true,
    slashconfirmpassword: true,
    slasholdpassword: true,
  };

  schema = {
    oldpassword: Joi.string().required().min(5).label("Your Password"),
    userpassword: Joi.string().required().min(5).label("New Password"),
    confirmuserpassword: Joi.string().required().min(5).label("New Password"),
  };
  onchangeone = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = this.validateProprety(input.name, input.value);
    this.setState({ data, errors: errors || {} });
  };
  onchangetwo = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = this.validatematch(
      input.name,
      input.value,
      this.state.data.userpassword
    );
    this.setState({ data, errors: errors || {} });
  };

  validatematch = (name, inputone, inputtwo) => {
    return inputone !== inputtwo ? { [name]: "Passwords do not match" } : null;
  };

  validation = () => {
    const options = { abortEarly: false };
    const data = this.state.data;
    let dataaftertrim = {};
    _.forEach(data, function (value, key) {
      dataaftertrim[key] = value.trim();
    });

    const { error } = Joi.validate(dataaftertrim, this.schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map((err) => (errors[err.path[0]] = err.message));
    return errors;
  };

  validateProprety = (name, value) => {
    this.setState({ check: true });
    const schema = { [name]: this.schema[name] };
    const data = { [name]: value };
    const { error } = Joi.validate(data, schema);
    if (!error) return null;
    const errors = {};
    errors[name] = error.details[0].message;
    return errors;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validation();
    if (errors) return this.setState({ errors } || {});

    this.dosubmit();
  };
  dosubmit = async () => {
    this.setState({
      loading: true,
      successmessage: "",
      check: false,
      reseterror: "",
    });
    try {
      const response = await http.put(`/params/password`, {
        oldPassword: this.state.data.oldpassword,
        newPassword: this.state.data.userpassword,
      });

      this.setState({
        successmessage: "Password updated successfully",
        loading: false,
        oldpassword: "",
        userpassword: "",
        confirmuserpassword: "",
      });
    } catch (err) {
      if (err.response) {
        this.setState({
          reseterror: err.response.data.message,
        });
      }

      this.setState({ loading: false });
    }
  };
  render() {
    const { errors, data } = this.state;
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
        <h5>Change your password</h5>
        <form
          style={{
            width: "100%",

            padding: 6,
          }}
        >
          <Input
            classInputContainer="classContainer "
            classInput="textclass"
            classError="errorclass"
            placeholder="Your password"
            name="oldpassword"
            type={this.state.slasholdpassword ? "password" : "text"}
            error={errors.oldpassword}
            value={data.oldpassword}
            onChange={this.onchangeone}
            eyeicon={true}
            slash={this.state.slasholdpassword}
            onclick={() =>
              this.setState({
                slasholdpassword: !this.state.slasholdpassword,
              })
            }
          />
          <Input
            classInputContainer="classContainer "
            classInput="textclass"
            classError="errorclass"
            placeholder="new password"
            name="userpassword"
            type={this.state.slashpassword ? "password" : "text"}
            error={errors.userpassword}
            value={data.userpassword}
            onChange={this.onchangeone}
            eyeicon={true}
            slash={this.state.slashpassword}
            onclick={() =>
              this.setState({
                slashpassword: !this.state.slashpassword,
              })
            }
          />

          <Input
            classInputContainer=""
            classInput="textclass"
            classError="errorclass"
            placeholder="confirm new password"
            name="confirmuserpassword"
            type={this.state.slashconfirmpassword ? "password" : "text"}
            error={errors.confirmuserpassword}
            value={data.confirmuserpassword}
            onChange={this.onchangetwo}
            eyeicon={true}
            slash={this.state.slashconfirmpassword}
            onclick={() =>
              this.setState({
                slashconfirmpassword: !this.state.slashconfirmpassword,
              })
            }
          />

          <div type="submit" className="resendlink" onClick={this.onSubmit}>
            {!this.state.loading ? (
              "Change"
            ) : (
              <Spincrescentcomponenet size="1x" color="#fbfbfb" />
            )}
          </div>
          {this.state.reseterror && (
            <div className="errorclass">{this.state.reseterror}</div>
          )}
          {this.state.successmessage && !this.state.check && (
            <div className="errorclass" style={{ color: "#07617d" }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Passwordparams);

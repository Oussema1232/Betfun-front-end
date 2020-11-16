import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import auth from "../../services/authService";
import Input from "../../commun/input";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import LoadingComponent from "../../commun/logos/loadingcomponent";
import http from "../../services/httpService";

import "./style.css";

export default class Resetpassword extends Component {
  state = {
    data: { userpassword: "", confirmuserpassword: "" },
    email: "",
    loading: false,
    errors: {},
    emailtoken: "",
    message: "",
    reseterror: "",
    showform: false,
    slashpassword: true,
    slashconfirmpassword: true,
  };

  schema = {
    userpassword: Joi.string().required().min(5).label("New Password"),
    confirmuserpassword: Joi.string().required().min(5).label("New Password"),
  };

  componentDidMount() {
    this.sendrequest();
  }

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
    return inputone !== inputtwo ? { [name]: "passwords do not match" } : null;
  };

  validation = () => {
    const options = { abortEarly: false };
    const data = this.state.data;
    let dataaftertrim = {};
    _.forEach(data, function (value, key) {
      dataaftertrim[key] = value.trim();
    });
    console.log(dataaftertrim);
    const { error } = Joi.validate(dataaftertrim, this.schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map((err) => (errors[err.path[0]] = err.message));
    return errors;
  };

  validateProprety = (name, value) => {
    this.setState({ check: false });
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

  sendrequest = async () => {
    this.setState({
      message: "",

      showform: false,
      loading: true,
    });

    const token = this.props.location.pathname.slice(
      this.props.location.pathname.lastIndexOf("/") + 1
    );

    const pathname = this.props.location.pathname.slice(
      1,
      this.props.location.pathname.lastIndexOf("/")
    );
    this.setState({ message: "", showmessage: false });
    try {
      const response = await http.post(
        `http://localhost:3001/api/confirmation/${token}`,
        { data: pathname }
      );
      this.setState({
        showform: true,
        email: response.data.data,
        loading: false,
        emailtoken: token,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          loading: false,
        });
      }
    }
  };

  dosubmit = async () => {
    this.setState({ loading: true, message: "" });
    try {
      const response = await http.post(
        `http://localhost:3001/api/resetpassword/${this.state.emailtoken}`,
        { userpassword: this.state.data.userpassword }
      );
      await auth.login(this.state.email, this.state.data.userpassword);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
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
            {this.state.reseteroor && <h3>{this.state.reseterror}</h3>}
            <>
              {this.state.showform ? (
                <>
                  <h6>Type down your new password</h6>
                  <form
                    style={{
                      width: "100%",
                      // border: "1px solid red",
                      paddingTop: 6,
                      paddingBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
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
                    </div>
                    <Input
                      classInputContainer=""
                      classInput="textclass"
                      classError="errorclass"
                      placeholder="confirm new password"
                      name="confirmuserpassword"
                      type={
                        this.state.slashconfirmpassword ? "password" : "text"
                      }
                      error={errors.confirmuserpassword}
                      value={data.confirmuserpassword}
                      onChange={this.onchangetwo}
                      eyeicon={true}
                      slash={this.state.slashconfirmpassword}
                      onclick={() =>
                        this.setState({
                          slashconfirmpassword: !this.state
                            .slashconfirmpassword,
                        })
                      }
                    />

                    <button
                      type="submit"
                      className="resendlink"
                      onClick={this.onSubmit}
                      // disabled={this.validation()}
                    >
                      {!this.state.loading ? (
                        "Reset"
                      ) : (
                        <Spincrescentcomponenet color="#e9eac9" />
                      )}
                    </button>
                    {this.state.reseterror && <h5>{this.state.reseterror}</h5>}
                  </form>
                </>
              ) : (
                <h3 style={{ marginLeft: 20 }}>{this.state.message}</h3>
              )}
            </>
          </div>
        </div>
      </>
    );
  }
}

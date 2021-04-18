import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, check: false, slasheye: true, errors: {} };

  onchange = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = this.validateProprety(input.name, input.value);
    this.setState({ data, errors: errors || {} });
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
    this.setState({ check: false });
    const schema = { [name]: this.schema[name] };
    const data = { [name]: value };
    const { error } = Joi.validate(data, schema);
    if (!error) return null;
    const errors = {};
    errors[name] = error.details[0].message;
    return errors;
  };

  setslash = () => {
    this.setState({ slasheye: !this.state.slasheye });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validation();
    if (errors) return this.setState({ errors } || {});

    this.dosubmit();
  };

  renderInput = (
    name,
    label,
    placeholder,
    classInputContainer,
    classInput,
    classError,
    eyeicon,

    type = "text"
  ) => {
    const { data, errors, slasheye } = this.state;
    return (
      <Input
        classInputContainer={classInputContainer}
        classInput={classInput}
        classError={classError}
        placeholder={placeholder}
        name={name}
        type={type}
        label={label}
        eyeicon={eyeicon}
        slash={slasheye}
        onclick={this.setslash}
        error={errors[name]}
        value={data[name]}
        onChange={this.onchange}
      />
    );
  };

  renderButton = (label, classButton) => {
    return (
      <div
        type="submit"
        className={classButton}
        onClick={this.onSubmit}
        // disabled={this.validation()}
      >
        <div>{label}</div>
      </div>
    );
  };

  renderSelect = (
    options,
    name,
    label,
    classSelectContainer,
    classSelect,
    classError,
    firstvalue
  ) => {
    const { errors, data } = this.state;
    return (
      <Select
        classSelectContainer={classSelectContainer}
        classSelect={classSelect}
        classError={classError}
        options={options}
        name={name}
        label={label}
        firstvalue={firstvalue}
        errors={errors[name]}
        value={data[name]}
        onChange={this.onchange}
      />
    );
  };
}

export default Form;

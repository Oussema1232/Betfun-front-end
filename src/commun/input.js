import React from "react";
import TextField from "@material-ui/core/TextField";
import Eyecomponenet from "./logos/eyecomponent";

const Input = ({
  name,
  label,
  error,
  classInputContainer,
  classInput,
  classError,
  eyeicon,
  slash,
  onclick,

  ...rest
}) => {
  return (
    <div className={classInputContainer}>
      {label && <label forhtml={name}>{label}</label>}
      <div
        style={{
          display: "flex",

          marginTop: 10,
          width: "96%",
        }}
      >
        {/* <input name={name} className={classInput} id={name} {...rest} /> */}
        <TextField name={name} className={classInput} id={name} {...rest} />
        {eyeicon && (
          <div
            style={{
              alignSelf: "center",
              width: 26,

              marginTop: 3,
            }}
          >
            <Eyecomponenet slash={slash} onclick={onclick} />
          </div>
        )}
      </div>

      {error && <div className={classError}>{error}</div>}
    </div>
  );
};

export default Input;

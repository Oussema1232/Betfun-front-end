import React from "react";
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
          border: "1px solid yellow",
          marginTop: 10,
          width: "96%",
          backgroundColor: "rgba(0, 0, 0, 1)",
          border: "1px solid rgb(20, 19, 19)",
          borderRadius: 3,
          borderBottomRightRadius: 1,
          borderBottomLeftRadius: 1,
        }}
      >
        <input name={name} className={classInput} id={name} {...rest} />
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

import React from "react";

const Input = ({ name, label, error,classInputContainer,classInput,classError, ...rest }) => {
  return (
    <div className={classInputContainer}>
          {label&&(<label forhtml={name}>{label}</label>)}
      <input name={name} className={classInput} id={name} {...rest}  />
      {error && (
        <div className={classError} >
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;

import React from "react";

const Select = ({
  classSelectContainer,
  classSelect,
  classError,
  options,
  name,
  label,
  errors,
  value,
  onChange,
}) => {
  return (
    <>
      <div className={classSelectContainer}>
        {label && <label forhtml={name}>{label}</label>}
        <select
          className={classSelect}
          id={name}
          onChange={onChange}
          value={value}
          name={name}
        >
          <option value="" >
            Country
          </option>

          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {errors && <div className={classError}>{errors}</div>}
    </>
  );
};

export default Select;

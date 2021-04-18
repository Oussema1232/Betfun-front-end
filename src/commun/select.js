import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

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
  firstvalue,
}) => {
  return (
    <>
      <div className={classSelectContainer}>
        {label && <label forhtml={name}>{label}</label>}
        <NativeSelect
          className={classSelect}
          value={value}
          onChange={onChange}
          inputProps={{
            name: name,
            id: name,
          }}
        >
          <option value="">{firstvalue}</option>

          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </NativeSelect>
      </div>
      {errors && <div className={classError}>{errors}</div>}
    </>
  );
};

export default Select;

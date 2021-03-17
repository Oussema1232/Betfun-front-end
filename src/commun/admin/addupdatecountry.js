import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";

import { loadCountries } from "../../features/countries/countrySlice";
import { updateCountry } from "../../features/countries/countrySlice";
import { postCountry } from "../../features/countries/countrySlice";

export default function AddUpdateCountry(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.countries.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.countries.onsuccess.message
  );
  const loading = useSelector((state) => state.betfundata.countries.loading);
  const [countryname, setCountryname] = useState(props.initialCountry.name);

  const [file, setFile] = useState(props.initialCountry.name);

  useEffect(() => {
    dispatch(loadCountries());
  }, []);

  const handleChangeName = (event) => {
    const value = event.target.value;
    setCountryname(value);
  };

  const handleChangelogo = (event) => {
    const value = event.target.files[0];
    setFile(value);
  };

  const submit = () => {
    const data = new FormData();

    data.append("name", countryname);

    data.append("file", file);
    props.update
      ? dispatch(updateCountry(`/${props.initialCountry.id}`, data))
      : dispatch(postCountry(data));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px dashed black",
          paddingBottom: 5,
          marginBottom: 5,
        }}
      >
        <input
          type="text"
          value={countryname}
          name="countryname"
          onChange={handleChangeName}
        />
        <input type="file" name="file" onChange={handleChangelogo} />

        <button onClick={submit}>
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>
        {errormessage ? (
          <div style={{ color: "red" }}>Error: {errormessage}</div>
        ) : (
          <div style={{ color: "green" }}>{successmessage}</div>
        )}
      </div>
    </div>
  );
}

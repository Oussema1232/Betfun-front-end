import React from "react";
import { useSelector } from "react-redux";
import AddUpdateCountry from "../../../commun/admin/addupdatecountry";

export default function AdminCountry() {
  const countries = useSelector((state) => state.betfundata.countries.list);

  const initialcountry = {
    name: "",
    id: "",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        
      }}
    >
      <h1>Countries</h1>
      <AddUpdateCountry initialCountry={initialcountry} />
      {countries.map((c) => (
        <div
          key={c.id}
          style={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",

            borderBottom: "1px dashed brown",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 50,
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: 10 }}>{c.name}</div>
            <img style={{ width: 50 }} src={c.logo} alt={c.logo} />
          </div>
          <AddUpdateCountry update={true} initialCountry={c} />
        </div>
      ))}
    </div>
  );
}

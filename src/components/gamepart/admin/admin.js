import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminCountry from "./admincountries";
import AdminDomain from "./admindomains";
import AdminSeason from "./adminseasons";
import AdminGameweeks from "./admingameweeks";

export default function Admin() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        marginTop: 100,
      }}
    >
      <AdminCountry />
      <AdminDomain />
      <AdminSeason />
      <AdminGameweeks />
    </div>
  );
}

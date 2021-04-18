import React from "react";
import AdminCountry from "./admincountries";
import AdminDomain from "./admindomains";
import AdminSeason from "./adminseasons";
import AdminGameweeks from "./admingameweeks";
import AdminLevels from "./adminlevels";
import AdminQuotes from "./adminquotes";
import AdminCategories from "./admincategories";
import AdminInformations from "./admininformations";
import AdminQuestions from "./adminquestions";
import AdminDifficulties from "./admindifficulties";
import AdminSuggestions from "./adminsuggestions";
import AdminGenres from "./adminleaguesgenres";

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
      <AdminLevels />
      <AdminQuotes />
      <AdminCategories />
      <AdminInformations />
      <AdminQuestions />
      <AdminDifficulties />
      <AdminGenres />
      <AdminSuggestions />
    </div>
  );
}

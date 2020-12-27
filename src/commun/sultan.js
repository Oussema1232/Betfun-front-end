import React from "react";
import Crown from "./logos/crown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Usermoonavatar from "./usermoonavatar";

export default function SultanComponent({
  sex,
  countrylogo,
  username,
  profilepicture,
  points,
  NTSultan,
  season,
}) {
  return (
    <div className="sultanContainer">
      <div
        style={{
          flexGrow: 1,
          color: "#eeeeee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderBottom: "2px solid #e6ab2d",
          maxHeight: 100,
          marginBottom: 10,
          paddingTop: 5,
          paddingBottom: 5,
          fontWeight: "bold",
          width: "100%",
        }}
      >
        <div className="sultanpointsContainer">{`${points} pts | ${NTSultan} Time(s) sultan`}</div>
        <div className="sultanBarTitle">
          <div className="sultanBarglibeseasonicon">
            <FontAwesomeIcon icon={faGlobe} size="lg" color="#e6ab2d" />
            <div style={{ fontSize: 9, color: "#e6ab2d" }}>{season}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sex == "Male" ? "Sultan" : "Sultana"}
          </div>
        </div>
        <div className="countryLogoContainer">
          <img src={countrylogo} style={{ width: 40 }} />
        </div>
      </div>
      <Crown />
      <img src={profilepicture} className="imagesultan" />

      <div
        style={{
          fontSize: 30,
          maxWidth: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
          display: "flex",
          //   flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>{username}</div>
      </div>
    </div>
  );
}

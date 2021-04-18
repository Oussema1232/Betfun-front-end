import React from "react";
import Crown from "./logos/crown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Usermoonavatar from "./usermoonavatar";

export default function SultanComponent({
  gender,
  countrylogo,
  sultanusername,

  points,
  NTSultan,
  season,
}) {
  return (
    <div className="sultanContainer">
      <div
        style={{
          flexGrow: 1,
          color: "#fbfbfb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderBottom: "2px solid #f9a828",
          maxHeight: 100,
          marginBottom: 10,
          paddingTop: 5,
          paddingBottom: 5,
          fontWeight: "bold",
          width: "100%",
        }}
      >
        <div className="sultanpointsContainer">{`${points} pts | ${NTSultan} Time(s) ${
          gender == "Male" ? "Sultan" : "Sultana"
        }`}</div>
        <div className="sultanBarTitle">
          <div className="sultanBarglibeseasonicon">
            <FontAwesomeIcon icon={faGlobe} size="lg" color="#f9a828" />
            <div style={{ fontSize: 9, color: "#f9a828" }}>{season}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {gender == "Male" ? "Sultan" : "Sultana"}
          </div>
        </div>
        <div className="countryLogoContainer">
          <img src={countrylogo} style={{ width: 40 }} />
        </div>
      </div>
      <Crown />

      <div
        className="imagesultan"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Usermoonavatar
          alt={sultanusername}
          dimentionmoon={75}
          dimentionimage={65}
          boxshadowcolor="#F4F1C9"
          username={sultanusername}
        />
      </div>
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

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>{sultanusername}</div>
      </div>
    </div>
  );
}

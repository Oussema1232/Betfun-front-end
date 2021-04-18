import React from "react";
import {  useSelector } from "react-redux";
import Domainpersonaldata from "../betfunwelcome/domainpersonaldata.js";
import Knowledgedata from "../betfunwelcome/knowledgedata.js";
import Usermoonavatar from "../../commun/usermoonavatar";

export default function Stats(props) {
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 10,
        marginTop: 100,
        boxSizing: "border-box",
      }}
    >
      <div
        className="betusermoonnameContainer"
        style={{ alignSelf: "flex-start", marginLeft: 20, marginTop: 30 }}
      >
        <Usermoonavatar
          alt={currentprofile.username}
          dimentionmoon={65}
          dimentionimage={55}
          username={currentprofile.username}
        />
        <div className="username">{currentprofile.username}</div>
      </div>
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid #d4d4d3",
          backgroundColor: "#fbfbfb",
          width: "100%",
          marginTop: 10,
        }}
      >
        <div className="domainknwoledgedatacontainer">
          <Domainpersonaldata />

          <Knowledgedata />
        </div>
      </div>
    </div>
  );
}

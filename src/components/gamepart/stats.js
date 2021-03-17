import React, { useState, useEffect } from "react";
import Domainpersonaldata from "../betfunwelcome/domainpersonaldata.js";
import Knowledgedata from "../betfunwelcome/knowledgedata.js";

import backwall from "../../img/backwall.jpg";

import knowledgeback from "../../img/knowledgeback2.jpg";

export default function Stats(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 10,
        marginTop: 100,

        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid #d4d4d3",
          backgroundColor: "#fbfbfb",
          width: "100%",
          marginTop: 30,
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

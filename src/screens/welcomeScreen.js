import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Domainpersonaldata from "../components/betfunwelcome/domainpersonaldata.js";
import Knowledgedata from "../components/betfunwelcome/knowledgedata.js";
import Quote from "../components/betfunwelcome/quote.js";
import backwall from "../img/backwall.jpg";
import knowledgeback from "../img/knowledgeback2.jpg";

import "./style.css";

export default function WelcomeScreen(props) {
  return (
    <div
      className="betsScreenContainer"
      style={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      <div className="welcomecontainer">
        <Quote />
        <div
          style={{
            // backgroundImage: `url(${knowledgeback})`,
            backgroundColor: "#fbfbfb",
            backgroundRepeat: "repeat",
            border: "1px dotted #07617d",
            borderRadius: 10,
            overflow: "hidden",

            width: "100%",
            marginTop: 30,
          }}
        >
          <div className="domainknwoledgedatacontainer">
            <Domainpersonaldata />

            <Knowledgedata />
          </div>
        </div>
        <Link
          to="/betfun/admin"
          style={{ alignSelf: "flex-start", fontSize: 10 }}
        >
          go to admin
        </Link>
      </div>
    </div>
  );
}

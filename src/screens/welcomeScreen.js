import React, { useState } from "react";
import Domainpersonaldata from "../components/betfunwelcome/domainpersonaldata.js";
import Knowledgedata from "../components/betfunwelcome/knowledgedata.js";
import Quote from "../components/betfunwelcome/quote.js";
import backwall from "../img/backwall.jpg";
import knowledgeback from "../img/knowledgeback2.jpg";

import "./style.css";

export default function WelcomeScreen() {
  const [showbubble, setShowbubble] = useState(false);
  return (
    <div
      className="betsScreenContainer"
      style={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        // border: "1px solid blue",
      }}
      // onMouseLeave={() => {
      //   setShowbubble(true);
      // }}
      // onMouseEnter={() => {
      //   setShowbubble(false);
      // }}
    >
      <div className="welcomecontainer">
        <Quote showbubble={showbubble} />
        <div
          style={{
            // backgroundImage: `url(${backwall})`,
            // background: `url(${backwall}) left top repeat, url(${knowledgeback}) right top repeat`,
            // backgroundSize: "60%, 40%, 100%",
            backgroundImage: `url(${knowledgeback})`,
            backgroundRepeat: "repeat",
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
    </div>
  );
}

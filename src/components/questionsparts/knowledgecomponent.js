import React, { useState } from "react";
import back from "../../img/vintageback.jpg";
import InformationTop from "../questionsparts/informationtop";
import Addquestion from "./addquestion";
import "./style.css";
import Choosedifficulty from "./choosedifficulty";

export default function KnowledgeComponent(props) {
  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: "repeat",
        width: "100%",
        fontFamily: "'Indie Flower', cursive",
        minHeight: "100vh",
        display: "flex",
        boxSizing: "border-box",

        alignItems: "center",
        paddingBottom: 10,
        flexDirection: "column",
      }}
    >
      <div className="knowledgecontainerwelcome">
        <div
          style={{
            width: "100%",
            fontSize: 50,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <span
            className="welcometocategory"
            style={{
              display: "inline-block",
              backgroundColor: "rgba(0,85,165,0.3)",
            }}
          >
            Welcome to All category
          </span>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <InformationTop />
        </div>

        <div className="choosediffaddquestContainer">
          <Addquestion />
          <Choosedifficulty />
        </div>
      </div>
    </div>
  );
}

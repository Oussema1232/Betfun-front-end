import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Choosedifficulty from "./choosedifficulty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import back from "../../img/vintageback.jpg";
import InformationTop from "../questionsparts/informationtop";
import Addquestion from "./addquestion";

import "./style.css";

export default function KnowledgeComponent(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: "repeat",
        width: "100%",

        minHeight: "100vh",
        display: "flex",
        boxSizing: "border-box",

        alignItems: "center",
        paddingBottom: 10,
        flexDirection: "column",
      }}
    >
      <div style={{ width: "90%", display: "flex", alignItems: "center" }}>
        <Link to="/knowledge/categories">
          <motion.div
            initial={{ y: 0 }}
            whileHover={{
              y: 10,
            }}
            whileTap={{ x: -200, y: 10, transition: { duration: 0.2 } }}
          >
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              size="3x"
              color="black"
              style={{ cursor: "pointer" }}
            />
          </motion.div>
        </Link>
      </div>
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
            className={currentuser.language == "Eng" ? "welcometocategory" : ""}
            style={{
              display: "inline-block",
              linHeight: currentuser.language == "Eng" ? "210%" : "normal",
              backgroundColor: "rgba(0,85,165,0.3)",
              textAlign: "center",
            }}
          >
            {currentuser.language == "Eng" ? "Welcome to " : "مرحبا بك في "}
            {props.match.params.categoryname}
          </span>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <InformationTop categoryId={props.match.params.categoryId} />
        </div>

        <div className="choosediffaddquestContainer">
          <Addquestion />
          <Choosedifficulty />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import knowledgeback from "../../img/knowledgeback2.jpg";
import "./style.css";
import Islamiccolumn from "../../commun/logos/islamiccolumn";

export default function Quote(props) {
  return (
    <div
     className="quotesoldiercontainer"
    >
      <div className="islamiccolumnclass">
        <Islamiccolumn x={[-5, 5]} />
        <AnimatePresence
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          exit={{ y: -5, opacity: 0 }}
        >
          {props.showbubble && (
            <motion.div className="bubble">
              Plz comme back Bettor, Betfun needs you
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="sideLimit"></div>
      <div className="quoteContainer">
        <div
          style={{
            width: 90,
            height: 90,
            marginTop: -45,
            marginLeft: -45,
            backgroundColor: "#ede5e5",
            alignSelf: "flex-start",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid blue",
          }}
        >
          <motion.div
            animate={{ rotate: [9, -9], transition: { yoyo: Infinity } }}
          >
            <FontAwesomeIcon icon={faQuoteLeft} size="2x" />
          </motion.div>
        </div>
        <div
          style={{
            width: "90%",
            fontSize: 17,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textJustify: "inter-word",
            marginBottom: 6,
          }}
        >
          Kindness is a mark of faith, and whoever has no kindness has no faith.
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textJustify: "inter-word",
          }}
        >
          Prophet Muhammad
        </div>
        <div
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#ede5e5",
            alignSelf: "flex-end",
            marginBottom: -45,
            marginRight: -45,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            animate={{ rotate: [9, -9], transition: { yoyo: Infinity } }}
          >
            <FontAwesomeIcon icon={faQuoteRight} size="2x" />
          </motion.div>
        </div>
      </div>
      <div className="islamiccolumnclass">
        <Islamiccolumn x={[-5, 5]} />
      </div>
      <div className="sideLimit"></div>
    </div>
  );
}

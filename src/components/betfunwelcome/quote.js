import React, {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { loadQuote } from "../../features/quotes/quoteSlice";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";

import "./style.css";

export default function Quote(props) {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.betfundata.quotes.oneQuote);
  useEffect(() => {
    dispatch(loadQuote(`/one`));
  }, []);
  return (
    <div className="quotesoldiercontainer">
      <div className="islamiccolumnclass">
        <Islamiccolumn x={[-5, 5]} y={[0, 5, 0]} dance={false} />
      </div>
      <div className="sideLimit"></div>
      <div className="quoteContainer">
        <div
          style={{
            width: 90,
            height: 90,
            marginTop: -45,
            marginLeft: -45,
            backgroundColor: "#ececeb",
            alignSelf: "flex-start",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
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
            flexDirection: "column",

            alignItems: "center",
            textJustify: "inter-word",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          <div
            className="quoteoftheday"
            style={{ marginTop: -30, marginBottom: 8 }}
          >
            --Quote of the day--
          </div>
          <div>{quote.description}</div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: 14,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textJustify: "inter-word",
            textAlign: "center",
          }}
        >
          {quote.author}
        </div>
        <div
          style={{
            width: 90,
            height: 90,
            backgroundColor: "#ececeb",
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
        <Islamiccolumn x={[-5, 5]} y={[0, 5, 0]} dance={false} />
      </div>
      <div className="sideLimit"></div>
    </div>
  );
}

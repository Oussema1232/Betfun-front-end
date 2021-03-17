import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";
import blackpaper from "../../img/backquest.jpg";
import { Link } from "react-router-dom";

export default function Welldone(props) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 22,
          marginTop: 20,

          flexDirection: "column",
        }}
      >
        <Islamiccolumn showmouth={true} dance={true} jump={[0, 5, 0]} />

        <div
          className="cool "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 5,
              }}
            >
              {props.score} points
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Well done Bettor, This dance is for you.
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 20,
          width: "100%",
          height: 50,
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{
            border: "1px dashed black",
          }}
          whileHover={{
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "3px",
          }}
          whileTap={{
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "3px",
            scale: 0.99,
          }}
          style={{
            width: 120,
            height: 50,
            boxSizing: "border-box",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            userSelect: "none",
            backgroundColor: "#F4F1C9 ",
            backgroundImage: `url(${blackpaper})`,
          }}
        >
          <Link
            to="/knowledge/learngame"
            style={{ color: "#02010f", textDecoration: "none" }}
          >
            Go Back
          </Link>
        </motion.div>
        <motion.div
          initial={{
            border: "1px dashed black",
          }}
          whileHover={{
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "3px",
          }}
          whileTap={{
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "3px",
            scale: 0.99,
          }}
          style={{
            width: 120,
            height: 50,
            cursor: "pointer",
            boxSizing: "border-box",
            display: "flex",
            userSelect: "none",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${blackpaper})`,
          }}
        >
          <Link
            to="/knowledge/learngame"
            style={{ color: "#02010f", textDecoration: "none" }}
          >
            Replay
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

export default function LevelandLimits(props) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "#f9a828",

        color: "#2e383f",
      }}
      whileTap={{
        backgroundColor: "#f9a828",

        color: "#2e383f",
      }}
      style={{
        width: "20%",
        minWidth: 220,

        backgroundColor: "#2e383f",
        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.img
        initial={{ scale: 0.99 }}
        whileHover={{
          scale: 1,
        }}
        whileTap={{ scale: 1 }}
        src={props.src}
        alt="level"
        style={{
          width: "100%",
        }}
      />
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 35,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {props.startingpoints}
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {props.endingpoints}
        </div>
      </motion.div>
    </motion.div>
  );
}

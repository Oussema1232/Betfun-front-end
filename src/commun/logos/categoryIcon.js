import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faDiceD6, faQuran } from "@fortawesome/free-solid-svg-icons";

export default function categoryIcon(props) {
  return (
    <motion.div
      initial={{ scale: 1, fontWeight: "normal" }}
      whileHover={{ scale: 1.1, fontWeight: 500 }}
      whileTap={{ scale: 1.1, fontWeight: 500 }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width: 70,
        marginRight: 12,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          display: "flex",
          backgroundColor: props.backgroundcolor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div animate={{ y: props.y, transition: { yoyo: Infinity } }}>
          <FontAwesomeIcon icon={props.iconName} size="2x" color="#eeeeee" />
        </motion.div>
      </div>
      <div style={{ fontSize: 20, fontFamily: "'Patrick Hand SC', cursive" }}>
        {props.iconTitle}
      </div>
    </motion.div>
  );
}

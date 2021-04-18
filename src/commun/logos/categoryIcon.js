import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faHistory,
  faMapMarkedAlt,
  faAtom,
  faBookReader,
  faUserAstronaut,
  faRunning,
  faHandshake,
  faMusic,
  faCoins,
  faGlobe,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

export default function CategoryIcon(props) {
  const [icon, setIcon] = useState("");
  const returnicon = () => {
    switch (props.iconName) {
      case "Culture":
        setIcon(faGlobe);
        break;
      case "History":
        setIcon(faHistory);
        break;
      case "Giography":
        setIcon(faMapMarkedAlt);
        break;
      case "Science":
        setIcon(faAtom);
        break;
      case "Literature":
        setIcon(faBookReader);
        break;
      case "Astronomy":
        setIcon(faUserAstronaut);
        break;
      case "Sports":
        setIcon(faRunning);
        break;
      case "Politics":
        setIcon(faHandshake);
        break;
      case "Music":
        setIcon(faMusic);
        break;
      case "Economy":
        setIcon(faCoins);
        break;
      default:
        setIcon(faAlignJustify);
    }
  };

  useEffect(() => returnicon(), []);

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
        width: 82,
        marginRight: 12,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 82,
          height: 82,
          borderRadius: "50%",
          display: "flex",
          backgroundColor: props.backgroundcolor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div animate={{ y: props.y, transition: { yoyo: Infinity } }}>
          <FontAwesomeIcon icon={icon} size="2x" color="#eeeeee" />
        </motion.div>
      </div>
      <div
        style={{
          width: "100%",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        {props.iconTitle}
      </div>
    </motion.div>
  );
}

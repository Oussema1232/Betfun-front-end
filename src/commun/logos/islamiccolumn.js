import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";

export default function Islamiccolumn(props) {
  return (
    <motion.div
      animate={{ x: props.x, transition: { yoyo: Infinity } }}
      style={{
        width: 50,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.div
        animate={{ y: [0, 5, 0], transition: { yoyo: Infinity } }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: 46,
            height: 30,
            backgroundColor: "grey",
            border: "1px solid black",
            borderBottom: "1px solid grey",
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon color="white" icon={faStarAndCrescent} size="1x" />
        </div>
        <div
          style={{
            width: 46,
            height: 20,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#e6ab2d",
            border: "1px solid black",
            borderTop: "0px solid #e6ab2d",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 8,
              height: 10,
              border: "1px solid black",
              borderTop: "1px solid grey",
              borderLeft: "0px solid black",
              backgroundColor: "grey",
            }}
          ></div>
          <div
            style={{
              width: 12,
              height: 7,
              border: "1px solid black",
              backgroundColor: "green",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              display: "flex",
              borderTop: "2px solid black",

              justifyContent: "center",
            }}
          >
            <div
              style={{ height: 4, width: 3, backgroundColor: "black" }}
            ></div>
          </div>
          <div
            style={{
              width: 5,
              height: 12,
              borderBottomRightRadius: 45,
              borderBottomLeftRadius: 45,
              border: "1px solid black",
              borderTop: "1px solid grey",

              backgroundColor: "grey",
            }}
          ></div>
          <div
            style={{
              width: 12,
              height: 7,
              border: "1px solid black",
              backgroundColor: "green",
              borderBottomRightRadius: "50%",
              borderBottomLeftRadius: "50%",
              display: "flex",
              borderTop: "2px solid black",
              justifyContent: "center",
            }}
          >
            <div
              style={{ height: 4, width: 3, backgroundColor: "black" }}
            ></div>
          </div>
          <div
            style={{
              width: 8,
              height: 10,
              border: "1px solid black",
              borderTop: "1px solid grey",
              borderRight: "0px solid black",
              backgroundColor: "grey",
            }}
          ></div>
        </div>
      </motion.div>
      <div
        style={{
          width: 37,
          height: 60,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          backgroundColor: "#070427",
          border: "1px solid #070427",
        }}
      ></div>
    </motion.div>
  );
}

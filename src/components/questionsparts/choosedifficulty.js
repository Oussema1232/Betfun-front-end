import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Choosedifficulty() {
  return (
    <motion.div
      initial={{
        border: "2px dashed black",
      }}
      whileHover={{
        borderStyle: "solid",
        // borderColor: "#0055a5",
        borderWidth: "2.5px",
      }}
      whileTap={{
        borderStyle: "solid",
        // borderColor: "#0055a5",
        borderWidth: "2.5px",
      }}
      style={{
        marginTop: 20,
        width: 250,
        height: 400,
        padding: 15,
        fontSize: 25,
        fontWeight: "bold",

        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 35,
        }}
      >
        <span style={{ borderBottom: "2px solid black" }}> Start Game</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          flexGrow: 1,
        }}
      >
        <motion.div
          initial={{
            border: "1px solid black",
            backgroundColor: "rgba(169,121,71,0.5)",
          }}
          whileHover={{
            borderColor: "#0055a5",
            borderWidth: "2px",
            backgroundColor: "rgba(169,121,71,0.9)",
            cursor: "pointer",
          }}
          whileTap={{
            borderColor: "#0055a5",
            borderWidth: "2px",
            backgroundColor: "rgba(169,121,71,0.9)",
            cursor: "pointer",
          }}
          style={{
            width: "90%",
            height: 50,
            padding: 5,

            boxSizing: "border-box",
          }}
        >
          <Link
            to="/knowledge/playround"
            style={{
              textDecoration: "none",
              color: "#02010f",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Easy
          </Link>
        </motion.div>
        <motion.div
          initial={{
            border: "1px solid black",
            backgroundColor: "rgba(169,121,71,0.5)",
          }}
          whileHover={{
            borderColor: "#0055a5",
            borderWidth: "2px",
            backgroundColor: "rgba(169,121,71,0.9)",
            cursor: "pointer",
          }}
          whileTap={{
            borderColor: "#0055a5",
            borderWidth: "2px",
            backgroundColor: "rgba(169,121,71,0.9)",
            cursor: "pointer",
          }}
          style={{
            width: "90%",
            height: 50,
            padding: 5,

            backgroundColor: "rgba(169,121,71,0.5)",
            boxSizing: "border-box",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Medium
        </motion.div>
        <motion.div
          initial={{
            border: "1px solid black",
            backgroundColor: "rgba(169,121,71,0.5)",
          }}
          whileHover={{
            borderColor: "#0055a5",
            borderWidth: "2px",
            backgroundColor: "rgba(169,121,71,0.9)",
            cursor: "pointer",
          }}
          whileTap={{
            borderColor: "#0055a5",
            borderWidth: "2px",
            backgroundColor: "rgba(169,121,71,0.9)",
            cursor: "pointer",
          }}
          style={{
            width: "90%",
            height: 50,
            padding: 5,

            backgroundColor: "rgba(169,121,71,0.5)",
            boxSizing: "border-box",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Hard
        </motion.div>
      </div>
    </motion.div>
  );
}

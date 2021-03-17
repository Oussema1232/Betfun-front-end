import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";
import blackpaper from "../../img/backquest.jpg";

export default function Wronganswers() {
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
        <Islamiccolumn showmouth={true} dance={false} />

        <div
          className="cool "
          style={{
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You have exceeded the maximum number of wrong answers. Sorry Bettor,
          better luck next Time
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
          Go Back
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
          Retry
        </motion.div>
      </div>
    </div>
  );
}

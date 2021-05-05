import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function AnswerItem(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);

  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          initial={{
            border: "1px dashed black",
          }}
          whileHover={{
            borderColor: props.clickable ? "#07617d" : "black",
            borderWidth: props.clickable ? "5px" : "1px",
            borderStyle: props.clickable ? "solid" : "dashed",
          }}
          exit={{ x: -1000, transition: { duration: 0.2 } }}
          whileTap={{
            borderColor: props.clickable ? "#07617d" : "black",
            borderWidth: props.clickable ? "5px" : "1px",
            borderStyle: props.clickable ? "solid" : "dashed",
          }}
          onClick={() => {
            props.clickAnswer(props.Engname, props.rank, [
              props.round[props.n].id,
              props.round[props.n][props.Engname],
            ]);
          }}
          className="cool"
          style={{
            backgroundColor: props.answerColor,
            cursor: "pointer",
            color: "black",
            fontWeight: "bold",
            boxSizing: "border-box",
            width: "40%",
            minWidth: "40%",
            maxHeight: "none",
            maxWidth: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 70,
            wordBreak: "break-all",
            boxSizing: "border-box",
            lineHeight: "normal",
            padding: 5,
            textAlign: currentuser.language == "Eng" ? "start" : "end",
          }}
        >
          {currentuser.language == "Arab"
            ? props.round[props.n][props.Arabname]
            : props.round[props.n][props.Engname]}
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}

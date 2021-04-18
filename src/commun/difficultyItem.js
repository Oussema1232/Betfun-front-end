import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DifficultyItem(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentcategory = useSelector(
    (state) => state.betfundata.currentcategory.data
  );

  const checkArab = () => {
    return currentuser.language == "Arab" ? true : false;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
        marginTop: 20,
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
          width: "95%",
          height: 60,
          padding: 5,

          boxSizing: "border-box",
        }}
      >
        <Link
          to={{
            pathname: `/knowledge/playround/${
              checkArab()
                ? `${currentcategory.Arabname}/${props.difficulty.Arabname}`
                : `${currentcategory.Engname}/${props.difficulty.Engname}`
            }`,
            state: { difficultychosen: props.difficulty },
          }}
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
          {checkArab() ? props.difficulty.Arabname : props.difficulty.Engname}
        </Link>
      </motion.div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid black",
          fontSize: checkArab() ? 18 : 15,
          height: 60,
          padding: 5,
          overflow: "auto",
          boxSizing: "border-box",
          color: "#eeeeee",
          backgroundColor: "rgba(0,0,0,0.71)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: checkArab() ? "row-reverse" : "row",
            justifyContent: "center",

            paddingLeft: checkArab() ? 10 : 0,
            paddingRight: checkArab() ? 0 : 10,

            boxSizing: "border-box",
            textAlign: checkArab() ? "end" : "start",
          }}
        >
          <div>{10 - props.difficulty.minCorrect}</div>
          {checkArab() ? (
            <div style={{ marginRight: 5 }}> أخطاء مسموح بها</div>
          ) : (
            <div style={{ marginLeft: 5 }}>wrong answers allowed</div>
          )}
        </div>
        <div
          style={{
            backgroundColor: "#eee",
            height: 40,
            width: 1,
            marginLeft: 2,
            marginRight: 2,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: checkArab() ? "row-reverse" : "row",
            justifyContent: "center",

            paddingLeft: currentuser.language !== "Arab" ? 10 : 0,
            paddingRight: checkArab() ? 10 : 0,

            boxSizing: "border-box",
            textAlign: checkArab() ? "end" : "start",
          }}
        >
          <div>{10 * props.difficulty.coefficient}</div>
          {checkArab() ? (
            <div style={{ marginRight: 5 }}> نقاط لكل سؤال</div>
          ) : (
            <div style={{ marginLeft: 5 }}>points per question</div>
          )}
        </div>
      </div>
    </div>
  );
}

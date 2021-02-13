import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Betleveldomainpersondata(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        width: "40%",
        borderRight: "1px solid #eeeeee",
        marginRight: 2,
      }}
    >
      <motion.div
        whileHover={{
          backgroundColor: "#ede5e5",

          color: "#070427",
        }}
        whileTap={{
          backgroundColor: "#ede5e5",

          color: "#070427",
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          minHeight: 50,

          fontWeight: "bold",
          backgroundColor: "#1f0000",
          color: "#eeeeee",
        }}
      >
        <div
          style={{
            width: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.stillleft && (
            <FontAwesomeIcon
              color="#1769aa"
              icon={faCaretLeft}
              size="2x"
              onClick={props.goLeft}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="domainpersondataname">{props.domainname}</div>
          <div className="domainpersondatapoints">{`${props.points} pts`}</div>
        </div>
        <div
          style={{
            width: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.stillright && (
            <FontAwesomeIcon
              color="#1769aa"
              icon={faCaretRight}
              size="2x"
              onClick={props.goRight}
            />
          )}
        </div>
      </motion.div>
      <div
        style={{
          flexGrow: 1,
          width: "100%",

          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          position: "relative",
        }}
      >
        <img style={{ width: "100%" }} src={props.imageSrc} />
        <motion.div
          whileHover={{
            backgroundColor: "rgba(0,0,0,0)",
          }}
          whileTap={{
            backgroundColor: "rgba(0,0,0,0)",
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        ></motion.div>
      </div>
    </div>
  );
}

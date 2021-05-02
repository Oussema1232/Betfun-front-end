import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Betleveldomainpersondata(props) {
  const levels = useSelector((state) => state.betfundata.levels.list);

  const [logo, setLogo] = useState("");
  useEffect(() => {
    let levellogo = levels.find((l) => {
      return (
        l[`${props.domainname.split(" ").join("")}startpoints`] <
          props.points &&
        props.points <= l[`${props.domainname.split(" ").join("")}endpoints`]
      );
    });

    if (levellogo) setLogo(levellogo.logo);
  }, [props.domainname, props.points, levels]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        width: "40%",
        borderRight: "1px solid #000",
        marginRight: 2,
      }}
    >
      <motion.div
        whileHover={{
          backgroundColor: "#ececeb",

          color: "#171717",
        }}
        whileTap={{
          backgroundColor: "#ececeb",

          color: "#171717",
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          minHeight: 50,

          fontWeight: "bold",
          backgroundColor: "#2e383f",
          color: "#fbfbfb",
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
              color="#07617d"
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
              color="#07617d"
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
        <img style={{ width: "100%" }} src={logo} />
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

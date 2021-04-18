import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";
import { Link } from "react-router-dom";
import blackpaper from "../../img/backquest.jpg";

export default function Wronganswers(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentcategory = useSelector(
    (state) => state.betfundata.currentcategory.data
  );
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
          textAlign: currentuser.language == "Arab" ? "end" : "start",
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
          {currentuser.language == "Arab" ? props.Araberror : props.Engerror}
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
          <Link
            to={`/knowledge/learngame/${
              currentuser.language == "Eng"
                ? currentcategory.Engname
                : currentcategory.Arabname
            }/${currentcategory.id}`}
            style={{ color: "#02010f", textDecoration: "none" }}
          >
            {currentuser.language == "Arab" ? "العودة" : "Go Back"}
          </Link>
        </motion.div>
        <motion.div
          onClick={() => props.onRetry()}
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
          {currentuser.language == "Arab" ? "أعد المحاولة" : "Retry"}
        </motion.div>
      </div>
    </div>
  );
}

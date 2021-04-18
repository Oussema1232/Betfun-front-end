import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function CircularStatic(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  React.useEffect(() => {
    const timer = setInterval(() => {
      props.beginTime();
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {props.progress >= 90 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ x: -1000, opacity: 0, transition: { duration: 0.2 } }}
            style={{
              width: "100%",
              left: 0,
              top: 0,
              minHeight: "100vh",
              zIndex: 800,
              position: "absolute",
              backgroundColor: "#f22a2a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#eeeeee",
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="7x" color="#eeeeee" />
            <div style={{ width: "100%", fontSize: 30, textAlign: "center" }}>
              {currentuser.language == "Arab"
                ? "كنت بطيئا جدا"
                : "You were too slow .."}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <CircularProgress
          variant="determinate"
          value={props.progress}
          color={props.progress < 80 ? "primary" : "secondary"}
          size={65}
        />
      )}
    </>
  );
}

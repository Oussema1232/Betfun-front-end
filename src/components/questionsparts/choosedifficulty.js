import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { loadDifficulties } from "../../features/difficulties/difficultySlice";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import DifficultyItem from "../../commun/difficultyItem";

export default function Choosedifficulty() {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const difficultiesloading = useSelector(
    (state) => state.betfundata.difficulties.loading
  );
  const errormessage = useSelector(
    (state) => state.betfundata.difficulties.errors.message
  );

  useEffect(() => {
    dispatch(loadDifficulties(`/${currentuser.language}`));
  }, []);

  const difficulties = useSelector(
    (state) => state.betfundata.difficulties.list
  );
  return (
    <motion.div
      initial={{
        border: "2px dashed black",
      }}
      whileHover={{
        borderStyle: "solid",

        borderWidth: "2.1px",
      }}
      whileTap={{
        borderStyle: "solid",

        borderWidth: "2.1px",
      }}
      className="choosediffContainer"
      style={{
        marginTop: 20,

        padding: 15,
        fontSize: 25,
        fontWeight: currentuser.language == "Arab" ? "normal" : "bold",

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
        <span style={{ borderBottom: "2px solid black" }}>
          {currentuser.language == "Arab" ? "اختر المستوى" : "Choose level"}
        </span>
      </div>
      {difficultiesloading ? (
        <div style={{ marginTop: 100 }}>
          <Spincrescentcomponenet color="#07617d" size="2x" />
        </div>
      ) : (
        <>
          {errormessage ? (
            <div style={{ marginTop: 100 }}>{errormessage}</div>
          ) : (
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
              {difficulties.map((d) => (
                <DifficultyItem difficulty={d} />
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

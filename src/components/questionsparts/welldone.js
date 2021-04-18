import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { postRoundanswers } from "../../features/round/roundSlice";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";
import blackpaper from "../../img/backquest.jpg";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

export default function Welldone(props) {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentcategory = useSelector(
    (state) => state.betfundata.currentcategory.data
  );
  const errormessage = useSelector(
    (state) => state.betfundata.round.errors.postmessage
  );
  const points = useSelector((state) => state.betfundata.round.points);
  const postdetailsLoading = useSelector(
    (state) => state.betfundata.round.postdetailsLoading
  );

  useEffect(() => {
    dispatch(
      postRoundanswers(`/${currentuser.language}`, {
        roundDetails: props.allanswers,
        difficultyId: props.difficultyId,
        userId: currentuser.id,
      })
    );
  }, []);

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
        {!postdetailsLoading && points == props.score && (
          <Islamiccolumn showmouth={true} dance={true} jump={[0, 5, 0]} />
        )}

        <div
          className="cool"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: currentuser.language == "Arab" ? "end" : "start",
          }}
        >
          {postdetailsLoading ? (
            <div>
              <Spincrescentcomponenet color="#07617d" size="2x" />
            </div>
          ) : (
            <>
              {errormessage ? (
                <div>{errormessage}</div>
              ) : (
                <>
                  {points !== props.score ? (
                    <div>
                      {currentuser.language == "Arab"
                        ? "حدثت مشكلة ، حاول مرة أخرى لاحقًا"
                        : "a problem occurred, try again later."}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <h2
                        style={{
                          display: "flex",
                          flexDirection:
                            currentuser.language == "Arab"
                              ? "row-reverse"
                              : "row",
                          justifyContent: "center",
                          marginBottom: 5,
                          paddingLeft: currentuser.language == "Arab" ? 10 : 0,
                          paddingRight: currentuser.language == "Arab" ? 0 : 10,
                        }}
                      >
                        <div>{props.score} </div>
                        {currentuser.language == "Arab" ? (
                          <div style={{ marginRight: 5 }}> نقاط</div>
                        ) : (
                          <div style={{ marginLeft: 5 }}>points</div>
                        )}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {currentuser.language == "Arab"
                          ? "أحسنت، هذه الرقصة لك"
                          : "Well done Bettor, This dance is for you."}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
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
          {currentuser.language == "Arab" ? "إعادة" : "Replay"}
        </motion.div>
      </div>
    </div>
  );
}

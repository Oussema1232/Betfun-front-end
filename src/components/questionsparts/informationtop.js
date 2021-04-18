import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadInformation } from "../../features/informations/informationSlice";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import Blogo from "../../commun/logos/blogo";


import "./style.css";

export default function InformationTop(props) {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const oneInfo = useSelector((state) => state.betfundata.informations.oneInfo);
  const loading = useSelector((state) => state.betfundata.informations.loading);
  const errormessage = useSelector(
    (state) => state.betfundata.informations.errors.message
  );

  useEffect(() => {
    dispatch(
      loadInformation(`/one/${props.categoryId}/${currentuser.language}`)
    );
  }, [props.categoryId]);
  return (
    <div
      className="cool"
      style={{
        minWidth: "100%",
        fontSize: 25,
        fontWeight: "bold",
        display: "flex",
        justifyContent: loading || errormessage ? "center" : "flex-start",
        alignItems: loading || errormessage ? "center" : "flex-start",
      }}
    >
      {loading ? (
        <div>
          <Spincrescentcomponenet color="#07617d" size="2x" />
        </div>
      ) : (
        <>
          {errormessage ? (
            <div
              style={{
                textAlign: currentuser.language == "Eng" ? "start" : "end",
              }}
            >
              {errormessage}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  paddingLeft: 30,
                  
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    textAlign: currentuser.language == "Eng" ? "start" : "end",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {currentuser.language == "Eng"
                    ? "Did you know?"
                    : "هل كنت تعلم؟"}
                </div>

                {currentuser.language == "Eng" ? (
                  <div style={{ alignSelf: "center", textAlign: "start" }}>
                    {oneInfo.Engdescription}
                  </div>
                ) : (
                  <div
                    style={{
                      alignSelf: "center",
                      textAlign: "end",
                    }}
                  >
                    {oneInfo.Arabdescription}
                  </div>
                )}
              </div>
              <Link to="/game/welcome" style={{ marginRight: 2 }}>
                <Blogo
                  style={{
                    width: 30,
                  }}
                />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

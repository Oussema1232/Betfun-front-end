import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Domainpersonaldata from "../components/betfunwelcome/domainpersonaldata.js";
import Knowledgedata from "../components/betfunwelcome/knowledgedata.js";
import Quote from "../components/betfunwelcome/quote.js";
import { savecurrentProfile } from "../features/currentprofile/currentprofileSlice";
import Usermoonavatar from "../commun/usermoonavatar";

import "./style.css";

export default function WelcomeScreen(props) {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.betfundata.currentuser.data);

  useEffect(() => {
    dispatch(
      savecurrentProfile({
        id: currentuser.id,
        username: currentuser.username,
        gender: currentuser.gender,
        isAdmin: currentuser.isAdmin,
        language: currentuser.language,
      })
    );
  }, []);
  return (
    <div
      className="betsScreenContainer"
      style={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      <div className="welcomecontainer">
        <Quote />

        <div
          className="betusermoonnameContainer"
          style={{ alignSelf: "flex-start", marginTop: 30, marginLeft: 20 }}
        >
          <Usermoonavatar
            alt={currentuser.username}
            dimentionmoon={65}
            dimentionimage={55}
            username={currentuser.username}
          />
          <div className="username">{currentuser.username}</div>
        </div>

        <div
          style={{
            backgroundColor: "#fbfbfb",
            display: "flex",

            border: "1px dotted #07617d",
            borderRadius: 10,
            overflow: "hidden",

            width: "100%",
            marginTop: 10,
          }}
        >
          <div className="domainknwoledgedatacontainer">
            <Domainpersonaldata />

            <Knowledgedata />
          </div>
        </div>
        {currentuser.isAdmin == 1 && (
          <Link
            to="/game/admin"
            style={{ alignSelf: "flex-start", fontSize: 10 }}
          >
            go to admin
          </Link>
        )}
      </div>
    </div>
  );
}

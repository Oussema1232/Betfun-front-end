import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { loadMatches } from "../../features/matches/matcheSlice";
import { sousListMatchguessescreated } from "../../features/matches/matcheSlice";
import { createBet } from "../../features/bets/betSlice.js";
import { savecurrentDomain } from "../../features/currentdomain/currentdomainSlice";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import TabPanel from "../../commun/panelTab";
import Betdetail from "../../commun/betdetail";
import Usermoonavatar from "../../commun/usermoonavatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    boxSizing: "border-box",

    display: "flex",
  },

  formControl: {
    margin: theme.spacing(1),

    minWidth: 120,
    maxWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Calendar(props) {
  //you have to make usernav as a redux state to show wich profile ou are on

  const dispatch = useDispatch();

  const matches = useSelector((state) => state.betfundata.matches.list);

  const betdetails = useSelector((state) => state.betfundata.matches.souslist);

  const guesseslist = [
    { value: "1", name: "1" },
    { value: "x", name: "x" },
    { value: "2", name: "2" },
  ];

  const submitBet = () => {
    dispatch(
      createBet({
        userId: 10,
        gameweekId: props.match.params.gameweekId,
        betdetails: betdetails,
      })
    );
  };

  useEffect(() => {
    dispatch(loadMatches(`/matches/${props.match.params.gameweekId}`));
  }, [props.match.params.gameweekId]);
  //get in component did mount or useeffect the bets of a certain domain

  const classes = useStyles();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
      <div className={classes.root}>
        <div className="betsTableAndSelectContainer">
          <div className="betusermoonsortContainer">
            <div className="betusermoonnameContainer">
              <Usermoonavatar
                src="../../../cr7profile.jpg"
                alt="cr7"
                dimentionmoon={65}
                dimentionimage={55}
                boxshadowcolor="#070427"
              />

              <h3 style={{ alignSelf: "flex-end", fontSize: 15 }}>
                Cristiano Ronaldo
              </h3>
            </div>
            <div style={{ fontWeight: "bold" }}>
              {props.match.params.seasonname}
            </div>
          </div>

          <div className="betsTableContainer">
            {matches.map((m) => (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    flexGrow: 1,
                  }}
                >
                  {m.days.map((matche) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className="betstabLine headerBets">{matche.day}</div>

                      {matche.matches.map((mtch) => (
                        <Betdetail
                          guesseslist={guesseslist}
                          betdetail={mtch}
                          label={true}
                          widthselect={70}
                          showsmalldate={false}
                          firstempty={true}
                          updateguess={sousListMatchguessescreated}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => submitBet()} style={{ width: 200 }}>
            Submit bet
          </button>
        </div>
      </div>
    </div>
  );
}

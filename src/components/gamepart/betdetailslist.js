import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { loadBetdetails } from "../../features/betdetails/betdetailSlice";
import {
  sousListBetdetailsUpdated,
  editbetdetailsguesses,
} from "../../features/betdetails/betdetailSlice";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import NativeSelect from "@material-ui/core/NativeSelect";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import Betdetail from "../../commun/betdetail";
import { Divider } from "@material-ui/core";

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

export default function BetdetailsList(props) {
  //get in component did mount or useeffect the bets of a certain domain
  const dispatch = useDispatch();

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );

  const newguesseslist = useSelector(
    (state) => state.betfundata.betdetails.souslist
  );
  const betdetails = useSelector((state) => state.betfundata.betdetails.list);
  const [guess, setGuess] = useState();

  const handleGuessChange = (event) => {
    const newguess = event.target.value;
    setGuess(newguess);
  };

  const guesseslist = [
    { value: "'1'", name: "1" },
    { value: "'x'", name: "x" },
    { value: "'2'", name: "2" },
  ];

  useEffect(() => {
    console.log("hi hi captain betdetails");
    dispatch(loadBetdetails(`/${props.match.params.betId}`));
  }, [props.match.params.betId]);

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
              <div className="username">
                Cristiano Ronaldo wild mas3oudia inabara
              </div>
            </div>

            {betdetails[0] && (
              <div
                style={{ fontWeight: "bold" }}
              >{`GW : ${betdetails[0].gameweekname}`}</div>
            )}
          </div>

          <div
            className="betsTableContainer"
            style={{ borderBottom: "1px solid white" }}
          >
            {betdetails.map((betdetail) => (
              <Betdetail
                guesseslist={guesseslist}
                betdetail={betdetail}
                showsmalldate={true}
                showresults={true}
                initialValue={`'${betdetail.guess}'`}
                updateguess={sousListBetdetailsUpdated}
              />
            ))}
          </div>
          <div
            className="createbetorleagueButton buttonsubmit"
            style={{
              width: 100,
              fontSize: 15,
              height: 20,
            }}
            onClick={() =>
              dispatch(
                editbetdetailsguesses(props.match.params.betId, newguesseslist)
              )
            }
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
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

  useEffect(() => {
    console.log("hi hi captain betdetails");
    dispatch(loadBetdetails(`/${props.match.params.betId}`));
  }, [props.match.params.betId]);

  const classes = useStyles();

  return (
    <div style={{ marginTop: 100 }}>
      <div className={classes.root}>
        <div className="betsTableAndSelectContainer">
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",

                marginLeft: 50,
              }}
            >
              <Usermoonavatar src="../../../cr7profile.jpg" alt="cr7" />
              <h3 style={{ alignSelf: "flex-end" }}>Cristiano Ronaldo</h3>
            </div>

            {betdetails[0] && (
              <h4>{`Gameweek ${betdetails[0].gameweekname}`}</h4>
            )}
          </div>

          <div className="betsTableContainer">
            <div className="betstabLine headerBets">
              <div className="betsTabCellule">Team1</div>
              <div className="betsTabCellule">Team2</div>
              <div className="betsTabCellule">1</div>
              <div className="betsTabCellule">x</div>
              <div className="betsTabCellule">2</div>
              <div className="betsTabCellule">guess</div>
              <div className="betsTabCellule">bingo</div>
              <div className="betsTabCellule">goals1</div>
              <div className="betsTabCellule">goals2</div>
            </div>
            {betdetails.map((betdetail) => (
              <Betdetail
                betdetail={betdetail}
                initialValue={`'${betdetail.guess}'`}
                updateguess={sousListBetdetailsUpdated}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          dispatch(
            editbetdetailsguesses(props.match.params.betId, newguesseslist)
          )
        }
      >
        submit
      </button>
    </div>
  );
}

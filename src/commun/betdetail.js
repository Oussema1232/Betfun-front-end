import React, { useEffect, useState } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },

  formControl: {
    margin: theme.spacing(1),

    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Betdetail(props) {
  //get in component did mount or useeffect the bets of a certain domain

  const dispatch = useDispatch();
  const [guess, setGuess] = useState(props.initialValue);

  const handleGuessChange = (event) => {
    const newguess = event.target.value;
    setGuess(newguess);
    dispatch(
      props.updateguess({
        idMatch: props.betdetail.idMatch,
        guess: event.target.value,
      })
    );
  };

  const classes = useStyles();

  return (
    <div className="betstabLine betdetailscontainer" style={{ fontSize: 12 }}>
      <div className="betsTabCellule matchteams">
        <div className="betsTabCellule team1">
          <div>{props.betdetail.team1}</div>
          <img
            src="../../../../../csslogo.png"
            style={{ width: 20, marginRight: 5 }}
          />
        </div>

        <div
          className="betsTabCellule"
          style={{
            width: 50,
            wordBreak: "normal",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {props.showsmalldate && (
            <div className="playedatBetDate" style={{ fontSize: 10 }}>
              {props.betdetail.day}
            </div>
          )}
          <div className="playedatBetTime" style={{ fontSize: 10 }}>
            {props.betdetail.time}
          </div>
        </div>
        <div className="betsTabCellule team2">
          <img
            src="../../../../../csslogo.png"
            style={{ width: 20, marginLeft: 5 }}
          />
          <div>{props.betdetail.team2}manunited</div>
        </div>
      </div>
      <div
        className=" betguessscorecontainer"
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          className="betsTabCellule"
          style={{
            width: "10%",
            minWidth: 20,
            flexGrow: 1,
            wordBreak: "normal",
            flexDirection: "column",
          }}
        >
          <div>{props.betdetail.cote_1}.52</div>
          <div
            style={{ borderTop: "1px solid blue", marginTop: 3, paddingTop: 3 }}
          >
            Cote_1
          </div>
        </div>
        <div
          className="betsTabCellule"
          style={{
            width: "10%",
            minWidth: 20,
            flexGrow: 1,
            wordBreak: "normal",
            flexDirection: "column",
          }}
        >
          <div>{props.betdetail.cote_x}.23</div>
          <div
            style={{ borderTop: "1px solid blue", marginTop: 3, paddingTop: 3 }}
          >
            Cote_X
          </div>
        </div>
        <div
          className="betsTabCellule"
          style={{
            width: "10%",
            minWidth: 20,
            flexGrow: 1,
            wordBreak: "normal",

            flexDirection: "column",
          }}
        >
          <div>{props.betdetail.cote_2}.45</div>
          <div
            style={{ borderTop: "1px solid blue", marginTop: 3, paddingTop: 3 }}
          >
            Cote_2
          </div>
        </div>
        <div
          className="betsTabCellule"
          style={{
            width: props.widthselect ? props.widthselect : 20,

            marginLeft: 3,
            boxSizing: "border-box",
          }}
        >
          <FormControl className={classes.formControl}>
            {props.label && (
              <InputLabel htmlFor="guess" style={{ fontSize: 13 }}>
                Bet
              </InputLabel>
            )}
            <NativeSelect
              value={guess}
              name="guess"
              onChange={handleGuessChange}
              disabled={props.disabled}
            >
              {props.firstempty && <option value=""></option>}
              {props.guesseslist.map((guess) => (
                <option value={guess.value}>{guess.name}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        {props.showresults && (
          <>
            <div
              className="betsTabCellule"
              style={{
                width: "10%",
                minWidth: 10,
                flexGrow: 1,
                flexDirection: "column",
              }}
            >
              <div>{props.betdetail.bingo}</div>
              <div
                style={{
                  borderTop: "1px solid blue",
                  marginTop: 3,
                  paddingTop: 3,
                }}
              >
                Bingo
              </div>
            </div>
            <div
              className="betsTabCellule"
              style={{
                width: "10%",
                minWidth: 20,
                wordBreak: "normal",
                flexDirection: "column",
              }}
            >
              <div>{props.betdetail.score}</div>
              <div
                style={{
                  borderTop: "1px solid blue",
                  wordBreak: "normal",
                  marginTop: 3,
                  paddingTop: 3,
                }}
              >
                score
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

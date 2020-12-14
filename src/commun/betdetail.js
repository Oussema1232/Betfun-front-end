import React, { useEffect, useState } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

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

export default function Betdetail(props) {
  //get in component did mount or useeffect the bets of a certain domain

  const guesseslist = [
    { value: "'1'", name: "1" },
    { value: "'x'", name: "x" },
    { value: "'2'", name: "2" },
  ];
  const dispatch = useDispatch();
  const [guess, setGuess] = useState(props.initialValue);
  const [showinitialvalue, setShowinitialvalue] = useState(true);

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div className="betsTabCellule">{props.betdetail.team1}</div>
      <div className="betsTabCellule">{props.betdetail.team2}</div>
      <div className="betsTabCellule">{props.betdetail.cote_1}</div>
      <div className="betsTabCellule">{props.betdetail.cote_x}</div>
      <div className="betsTabCellule">{props.betdetail.cote_2}</div>
      <div className="betsTabCellule">
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={guess}
            name="kouki"
            onChange={handleGuessChange}
            onClick={() => setShowinitialvalue(false)}
          >
            {/* {showinitialvalue && <option value="">{guess}</option>} */}
            {guesseslist.map((guess) => (
              <option value={guess.value}>{guess.name}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
      <div className="betsTabCellule">{props.betdetail.bingo}</div>
      <div className="betsTabCellule">{props.betdetail.goals1}</div>
      <div className="betsTabCellule">{props.betdetail.goals2}</div>
    </div>
  );
}

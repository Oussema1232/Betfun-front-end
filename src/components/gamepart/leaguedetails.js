import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { loadLeaguedetails } from "../../features/leaguedetails/leaguedetailSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
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

    display: "flex",
  },

  formControl: {
    margin: theme.spacing(1),
    marginTop: -10,
    minWidth: 80,
    maxWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BetdetailsList(props) {
  //get in component did mount or useeffect the bets of a certain domain

  const [state, setState] = React.useState({
    Sorted_By: "",
  });

  const handleChangeSort = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const dispatch = useDispatch();

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );

  const leaguedetails = useSelector(
    (state) => state.betfundata.leaguedetails.list
  );

  useEffect(() => {
    console.log("hi hi captain betdetails");
    dispatch(
      loadLeaguedetails(
        `/rank/${props.match.params.leagueId}/${props.match.params.seasonId}`
      )
    );
  }, [props.match.params.leagueId]);

  const classes = useStyles();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
      <div className={classes.root}>
        <div className="betsTableAndSelectContainer">
          <div className="betusermoonsortContainer">
            <div
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginLeft: 10,
                color: "#070427",
              }}
            >
              {props.match.params.leaguename}
              <span style={{ color: "#e6ab2d" }}>/</span>
              {leaguedetails[0] && leaguedetails[0].seasonname}
            </div>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="month" style={{ fontSize: 13 }}>
                Month
              </InputLabel>
              <NativeSelect
                value={state.Sorted_By}
                onChange={handleChangeSort}
                inputProps={{
                  name: "Sorted_By",
                  id: "month",
                }}
              >
                <option aria-label="None" value="" />
                <option value="asc">Pts asc</option>
                <option value="desc">Pts desc</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div className="betsTableContainer" style={{ fontSize: 12 }}>
            <div className="betstabLine headerBets">
              <div
                className="betsTabCellule"
                style={{
                  width: "25%",

                  fontWeight: "normal",
                }}
              >
                Bettor
              </div>
              <div
                className="betsTabCellule"
                style={{
                  width: "5%",
                  minWidth: 10,

                  wordBreak: "normal",
                }}
              />

              <div
                className="betsTabCellule"
                style={{
                  width: "20%",

                  wordBreak: "normal",
                }}
              >
                Rank
              </div>
              <div
                className="betsTabCellule"
                style={{
                  width: "20%",

                  wordBreak: "normal",
                }}
              >
                Last Rank
              </div>
              <div
                className="betsTabCellule"
                style={{
                  width: "15%",

                  wordBreak: "normal",
                }}
              >
                GW
              </div>
              <div
                className="betsTabCellule"
                style={{
                  width: "15%",

                  fontWeight: "normal",
                  wordBreak: "normal",
                }}
              >
                T.pts
              </div>
            </div>
            {leaguedetails.map((league) => (
              <div className="betstabLine">
                <div
                  className="betsTabCellule"
                  style={{
                    width: "25%",
                  }}
                >
                  {league.username}manoubiwildhoumti ilheyil mala ka3ba
                </div>
                <div
                  className="betsTabCellule"
                  style={{
                    width: "5%",
                    minWidth: 10,
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      league.rank == league.oldRank
                        ? faCircle
                        : league.rank < league.oldRank
                        ? faArrowCircleUp
                        : faArrowCircleDown
                    }
                    size="  "
                    color={
                      league.rank == league.oldRank
                        ? "#838193"
                        : league.rank < league.oldRank
                        ? "green"
                        : "red"
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div
                  className="betsTabCellule"
                  style={{
                    width: "20%",
                    wordBreak: "normal",
                  }}
                >
                  {league.rank}
                </div>
                <div
                  className="betsTabCellule"
                  style={{
                    width: "20%",
                    wordBreak: "normal",
                  }}
                >
                  {league.oldRank}
                </div>
                <div
                  className="betsTabCellule"
                  style={{
                    width: "15%",

                    wordBreak: "normal",
                  }}
                >
                  {league.GW_points}
                </div>
                <div
                  className="betsTabCellule"
                  style={{
                    width: "15%",
                    wordBreak: "normal",
                  }}
                >
                  {league.total_points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

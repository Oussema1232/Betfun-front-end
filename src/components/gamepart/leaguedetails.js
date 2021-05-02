import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import Skeleton from "@material-ui/lab/Skeleton";
import NativeSelect from "@material-ui/core/NativeSelect";
import { loadLeaguedetails } from "../../features/leaguedetails/leaguedetailSlice";
import { savecurrentProfile } from "../../features/currentprofile/currentprofileSlice";
import CodeModal from "../../commun/codeModal";

import SkullLeaguedetails from "../../commun/skulldata";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
    boxSizing: "border-box",

    display: "flex",
  },

  formControl: {
    margin: theme.spacing(1),
    marginTop: -10,
    minWidth: 80,
    maxWidth: 100,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      margin: 0,
      marginLeft: 10,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BetdetailsList(props) {
  //get in component did mount or useeffect the bets of a certain domain

  const [month, setMonth] = useState("");

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };
  const dispatch = useDispatch();

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );

  const leaguedetails = useSelector(
    (state) => state.betfundata.leaguedetails.list
  );

  const leaguedetailsError = useSelector(
    (state) => state.betfundata.leaguedetails.errors.message
  );

  const monthsPlayedatdomain = useSelector(
    (state) => state.betfundata.leagues.monthsPlayedatdomain
  );

  const loadingLeaguedetails = useSelector(
    (state) => state.betfundata.leaguedetails.loading
  );

  useEffect(() => {
    dispatch(
      loadLeaguedetails(
        `/rank/${props.match.params.leagueId}/${props.match.params.seasonId}${
          month && `/${month}`
        }`
      )
    );
  }, [props.match.params.leagueId, month]);

  const classes = useStyles();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ececeb" }}>
      {loadingLeaguedetails ? (
        <SkullLeaguedetails
          flexDirection="row"
          justifyContent="space-between"
          dontshowtabs={true}
        >
          <Skeleton
            animation="pulse"
            variant="text"
            height={35}
            width={85}
            style={{ alignSelf: "center", marginLeft: 10 }}
          />

          <Skeleton
            animation="pulse"
            variant="rect"
            height={24}
            width={85}
            style={{ alignSelf: "center", marginRight: 10 }}
          />
        </SkullLeaguedetails>
      ) : (
        <>
          {leaguedetailsError ? (
            <div className="loadingerrorMessage">
              <div
                className="betstabLine headerBets"
                style={{
                  fontSize: 20,
                  backgroundColor: "#ececeb",
                  border: "none",
                }}
              >
                {leaguedetailsError}
              </div>
            </div>
          ) : (
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
                    <span style={{ display: "inline-block", marginRight: 2 }}>
                      {props.match.params.leaguename}
                    </span>
                    <span style={{ display: "inline-block", color: "#e6ab2d" }}>
                      /
                    </span>
                    <span style={{ display: "inline-block", marginLeft: 2 }}>
                      {leaguedetails[0] && leaguedetails[0].seasonname}
                    </span>
                  </div>

                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="month" style={{ fontSize: 13 }}>
                      Month
                    </InputLabel>
                    <NativeSelect
                      value={month}
                      onChange={handleChangeMonth}
                      inputProps={{
                        name: "month",
                        id: "month",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {monthsPlayedatdomain &&
                        monthsPlayedatdomain.map((m) => (
                          <option value={m.month_name}>{m.month_name}</option>
                        ))}
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
                    <div
                      className="betstabLine"
                      style={{
                        backgroundColor:
                          league.userId == currentuser.id && " #e6ab2d",
                      }}
                    >
                      <div
                        onClick={() => {
                          dispatch(
                            savecurrentProfile({
                              id: league.userId,
                              username: league.username,
                              language: league.language,
                              isAdmin: league.isAdmin,
                              gender: league.gender,
                            })
                          );
                        }}
                        className="betsTabCellule"
                        style={{
                          width: "25%",
                          textDecoration: "none",
                          color: "#02010f",
                        }}
                      >
                        <Link
                          to={`/game/bet/bets/${currentdomain.name}/${currentdomain.id}`}
                          style={{
                            width: "100%",
                            textDecoration: "none",
                            color: "#02010f",
                          }}
                        >
                          {league.username}
                        </Link>
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{
                          width: "5%",
                          minWidth: 10,
                        }}
                      >
                        {!month && (
                          <FontAwesomeIcon
                            icon={
                              league.rank == league.oldRank ||
                              league.oldRank == "-" ||
                              leaguedetails.length == 1
                                ? faCircle
                                : league.rank < league.oldRank
                                ? faArrowCircleUp
                                : faArrowCircleDown
                            }
                            size=""
                            color={
                              league.rank == league.oldRank ||
                              league.oldRank == "-" ||
                              leaguedetails.length == 1
                                ? "#838193"
                                : league.rank < league.oldRank
                                ? "green"
                                : "red"
                            }
                            style={{ cursor: "pointer" }}
                          />
                        )}
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
                        {!month ? league.oldRank : "-"}
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{
                          width: "15%",

                          wordBreak: "normal",
                        }}
                      >
                        {!month ? league.GW_points : "-"}
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{
                          width: "15%",
                          wordBreak: "normal",
                        }}
                      >
                        {league.total_points == null ? 0 : league.total_points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentuser.id == props.location.state.creatorId && (
            <CodeModal leagueId={props.match.params.leagueId} />
          )}
        </>
      )}
    </div>
  );
}

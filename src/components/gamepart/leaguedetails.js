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
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import FormControl from "@material-ui/core/FormControl";
import Skeleton from "@material-ui/lab/Skeleton";
import NativeSelect from "@material-ui/core/NativeSelect";
import CodeModal from "../../commun/codeModal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SkullLeaguedetails from "../../commun/skulldata";
import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import Betdetail from "../../commun/betdetail";

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

  const [month, setMonth] = React.useState("");

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };
  const dispatch = useDispatch();

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
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
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
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
                  backgroundColor: "#ede5e5",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {leaguedetailsError} ...
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
                        backgroundColor: league.userId == 6 && " #e6ab2d",
                      }}
                    >
                      <div
                        className="betsTabCellule"
                        style={{
                          width: "25%",
                        }}
                      >
                        {league.username}
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
                              (league.oldRank == "-" &&
                                leaguedetails.length == 1)
                                ? faCircle
                                : league.rank < league.oldRank
                                ? faArrowCircleUp
                                : faArrowCircleDown
                            }
                            size=""
                            color={
                              league.rank == league.oldRank ||
                              (league.oldRank == "-" &&
                                leaguedetails.length == 1)
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
          <CodeModal leagueId={props.match.params.leagueId} />
        </>
      )}
    </div>
  );
}

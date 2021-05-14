import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { loadMatches, postBingos } from "../../features/matches/matcheSlice";
import { loadGameweeks } from "../../features/gameweeks/gameweekSlice.js";
import { loadTeams } from "../../features/teams/teamSlice.js";

import TabPanel from "../../commun/panelTab";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import SkullCalendar from "../../commun/skulldata";
import Updatematch from "../../commun/admin/updatematch";
import Bingopost from "../../commun/admin/bingopost";
import http from "../../services/httpService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
    boxSizing: "border-box",

    display: "flex",
  },

  tab: {
    borderRight: `1px solid #e6ab2d`,
    color: "#02010f",
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      paddingLeft: 1,
    },
  },

  tabs: {
    height: 224,
    marginRight: 10,
    minWidth: 55,
    [theme.breakpoints.down("sm")]: {
      marginRight: 2,
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Calendar(props) {
  //you have to make usernav as a redux state to show wich profile ou are on
  const classes = useStyles();
  const [gameweekvalue, setGameweekvalue] = React.useState({ nothing: "" });
  const [open, setOpen] = React.useState(false);
  const [timeIsUp, setTimeIsUp] = React.useState({
    loadingverify: false,
    isUp: false,
    alreadycreated: false,
    errorverify: false,
    message: "",
    messageverifyerror: "",
  });

  const dispatch = useDispatch();
  const gameweeks = useSelector((state) => state.betfundata.gameweeks.list);
  const loadgameweeks = useSelector(
    (state) => state.betfundata.gameweeks.loading
  );
  const gameweeksError = useSelector(
    (state) => state.betfundata.gameweeks.errors.message
  );

  const matches = useSelector((state) => state.betfundata.matches.list);
  const allmatches = useSelector(
    (state) => state.betfundata.matches.allmatches
  );

  const loadmatches = useSelector((state) => state.betfundata.matches.loading);
  const matchesError = useSelector(
    (state) => state.betfundata.matches.errors.message
  );

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);

  useEffect(() => {
    dispatch(
      loadGameweeks(`/${props.match.params.seasonId}/${currentdomain.id}`)
    );
    dispatch(
      loadMatches(`/matches/${props.match.params.seasonId}/${currentdomain.id}`)
    );
    dispatch(loadTeams(`/${currentdomain.id}`));
  }, [props.match.params.seasonId, props.match.params.domainId]);

  const handleClose = () => {
    setOpen(false);
  };

  const verifybet = async () => {
    setTimeIsUp({
      loadingverify: true,
      isUp: false,
      errorverify: false,
      alreadycreated: false,
      message: "",
      messageverifyerror: "",
    });
    try {
      const response = await http.post(`/bets/verifybet`, {
        userId: currentuser.id,
        gameweekId:
          gameweeks[0] && !gameweekvalue.id
            ? gameweeks[0].id
            : gameweekvalue.id,
      });
      return response.data.message;
    } catch (err) {
      if (err.response && err.response.status == 400) {
        setTimeIsUp({
          loadingverify: false,
          isUp: false,
          alreadycreated: false,
          errorverify: true,
          message: "",
          messageverifyerror: err.response.data.message,
        });
      }
    }
    setTimeIsUp({
      loadingverify: false,
      isUp: false,
      errorverify: false,
      alreadycreated: false,
      message: "",
      messageverifyerror: "",
    });
  };

  const goTocreateBet = (matchtime) => {
    const message = verifybet();
    if (message) {
      return setTimeIsUp({
        loadingverify: false,
        isUp: false,
        alreadycreated: true,
        message,
        isUp: false,
        messageverifyerror: "",
        errorverify: false,
      });
    } else if (moment(matchtime).diff(moment(), "minutes") > 60) {
      props.history.push(
        `/game/bet/bets/createbet/${currentuser.username}/${
          currentdomain.name
        }/${props.match.params.seasonname}/${
          gameweeks[0] && !gameweekvalue.name
            ? gameweeks[0].name
            : gameweekvalue.name
        }/${currentuser.id}/${
          gameweeks[0] && !gameweekvalue.id ? gameweeks[0].id : gameweekvalue.id
        }`
      );
    } else {
      setTimeIsUp({
        isUp: true,
        message: "Time is up, You can't create a Bet",
      });
    }
    setOpen(true);
  };

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ececeb" }}>
      {loadgameweeks || loadmatches ? (
        <SkullCalendar flexDirection="column">
          <Skeleton animation="pulse" variant="text" height={24} width={60} />
          <Skeleton animation="pulse" variant="rect" height={30} width={150} />
        </SkullCalendar>
      ) : (
        <>
          {matchesError || gameweeksError ? (
            <div className="loadingerrorMessage">
              <div
                className="betstabLine headerBets"
                style={{
                  fontSize: 20,
                  backgroundColor: "#ececeb",
                  border: "none",
                }}
              >
                {gameweeksError}
              </div>
              <div
                className="betstabLine headerBets"
                style={{
                  fontSize: 20,
                  backgroundColor: "#ececeb",
                  border: "none",
                }}
              >
                {matchesError}
              </div>
            </div>
          ) : (
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                indicatorColor="primary"
                className={classes.tabs}
                value={
                  gameweeks[0] && !gameweekvalue.id
                    ? gameweeks[0].id
                    : gameweekvalue.id
                }
                aria-label="Vertical tabs example"
              >
                {gameweeks.map((g) => (
                  <Tab
                    key={g.id}
                    label={g.name}
                    value={g.id}
                    onClick={() => setGameweekvalue(g)}
                    className={classes.tab}
                  />
                ))}
              </Tabs>
              <div className="betsTableAndSelectContainer">
                <div style={{ marginBottom: 10, fontWeight: "bold" }}>
                  {props.match.params.seasonname}
                </div>

                {currentuser.id == currentprofile.id && (
                  <div
                    className="createbetorleagueButton"
                    onClick={() =>
                      goTocreateBet(matches[0].days[0].matches[0].played_on)
                    }
                  >
                    {timeIsUp.loadingverify ? (
                      <Spincrescentcomponenet size="1x" color="#fbfbfb" />
                    ) : (
                      "Create Bet"
                    )}
                  </div>
                )}
                {currentuser.isAdmin == 1 && (
                  <Updatematch
                    initialMatch={{
                      idMatch: "",
                      team1Id: "",
                      team2Id: "",
                      played_on: "2020-09-26 17:05:00",
                      cote_1: "",
                      cote_x: "",
                      cote_2: "",
                    }}
                    gameweekId={
                      gameweeks[0] && !gameweekvalue.id
                        ? gameweeks[0].id
                        : gameweekvalue.id
                    }
                  />
                )}

                {matches.length == 0 ? (
                  <div
                    className="betstabLine headerBets"
                    style={{
                      fontSize: 20,
                      backgroundColor: "#ececeb",
                      border: "none",
                    }}
                  >
                    There is no matches yet
                  </div>
                ) : (
                  <div className="betsTableContainer">
                    {matches.map((m) => (
                      <TabPanel
                        key={m.gameweekId}
                        value={
                          gameweeks[0] && !gameweekvalue.id
                            ? gameweeks[0].id
                            : gameweekvalue.id
                        }
                        index={m.gameweekId}
                        isclass={true}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 10,
                            fontWeight: "bold",
                          }}
                        >
                          {m.days.map((matche) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className="betstabLine headerBets">
                                {matche.day}
                              </div>

                              {matche.matches.map((mtch) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div className="betstabLine">
                                    <div
                                      className="betsTabCellule"
                                      style={{
                                        width: "45%",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <div>{mtch.team1}</div>

                                      <img
                                        src={mtch.team1logo}
                                        style={{
                                          width: 30,
                                          marginLeft: 5,
                                          marginRight: 5,
                                        }}
                                      />
                                    </div>

                                    <div
                                      className="betsTabCellule playedatBetTime"
                                      style={{
                                        width: "10%",
                                        fontWeight: "normal",
                                        wordBreak: "normal",
                                      }}
                                    >
                                      {mtch.time}
                                    </div>

                                    <div
                                      className="betsTabCellule"
                                      style={{
                                        width: "45%",
                                        justifyContent: "flex-start",
                                        flexGrow: 1,
                                      }}
                                    >
                                      <img
                                        src={mtch.team2logo}
                                        style={{
                                          width: 30,
                                          marginRight: 5,
                                          marginLeft: 5,
                                        }}
                                      />
                                      <div>{mtch.team2}</div>
                                    </div>
                                  </div>
                                  {currentuser.isAdmin == 1 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        borderBottom: "2px solid black",
                                      }}
                                    >
                                      <Updatematch
                                        update={true}
                                        initialMatch={mtch}
                                      />

                                      <Bingopost initialMatch={mtch} />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {currentuser.isAdmin == 1 && (
            <button
              onClick={() =>
                dispatch(
                  postBingos({
                    bingos: allmatches,
                    gameweekId:
                      gameweeks[0] && !gameweekvalue.id
                        ? gameweeks[0].id
                        : gameweekvalue.id,
                  })
                )
              }
            >
              post bingos
            </button>
          )}
        </>
      )}
      {(timeIsUp.isUp || timeIsUp.errorverify || timeIsUp.alreadycreated) && (
        <Snackbar
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning">
            <AlertTitle>Time is Up</AlertTitle>
            {timeIsUp.message ? timeIsUp.message : timeIsUp.messageverifyerror}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

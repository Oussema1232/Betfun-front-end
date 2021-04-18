import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { loadMatches } from "../../features/matches/matcheSlice";
import { loadGameweeks } from "../../features/gameweeks/gameweekSlice.js";

import TabPanel from "../../commun/panelTab";
import SkullFixture from "../../commun/skulldata";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
    boxSizing: "border-box",

    display: "flex",
  },

  tab: {
    borderRight: `1px solid #e6ab2d`,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      paddingLeft: 1,
    },
  },

  faketabs: {
    height: 224,
    width: 150,
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      marginRight: 2,
      width: 100,
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

export default function Fixtures(props) {
  //you have to make usernav as a redux state to show wich profile ou are on

  const dispatch = useDispatch();
  const gameweeks = useSelector(
    (state) => state.betfundata.matches.fixturegameweeks
  );
  const loadgameweeks = useSelector(
    (state) => state.betfundata.gameweeks.loading
  );
  const gameweeksError = useSelector(
    (state) => state.betfundata.gameweeks.errors.message
  );

  const matches = useSelector((state) => state.betfundata.matches.list);
  const loadmatches = useSelector((state) => state.betfundata.matches.loading);
  const matchesError = useSelector(
    (state) => state.betfundata.matches.errors.message
  );

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  useEffect(() => {
    dispatch(
      loadGameweeks(`/${props.match.params.seasonId}/${currentdomain.id}`)
    );
    dispatch(
      loadMatches(
        `/fixtures/${props.match.params.seasonId}/${currentdomain.id}`
      )
    );
  }, [props.match.params.seasonId, props.match.params.domainId]);
  //get in component did mount or useeffect the bets of a certain domain

  const classes = useStyles();
  const [gameweekvalue, setGameweekvalue] = React.useState({ nothing: "" });

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ececeb" }}>
      {loadgameweeks || loadmatches ? (
        <SkullFixture flexDirection="column">
          <Skeleton animation="pulse" variant="text" height={24} width={60} />
        </SkullFixture>
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
                  fontWeight: "bold",
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
                  fontWeight: "bold",
                }}
              >
                {matchesError}
              </div>
            </div>
          ) : (
            <div className={classes.root}>
              {matches[0] ? (
                <>
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

                    <div className="betsTableContainer">
                      {matches.map((m) => (
                        <TabPanel
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
                              // border: "1px solid yellow",
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
                                  <div className="betstabLine">
                                    <div
                                      className="betsTabCellule"
                                      style={{
                                        width: "45%",

                                        // border: "1px solid red",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <div>{mtch.team1}</div>
                                      <img
                                        src={mtch.team1logo}
                                        style={{
                                          width: 25,
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
                                      }}
                                    >
                                      <img
                                        src={mtch.team2logo}
                                        style={{
                                          width: 25,
                                          marginLeft: 5,
                                          marginRight: 5,
                                        }}
                                      />
                                      <div>{mtch.team2}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </TabPanel>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 25,
                  }}
                >
                  No games left
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

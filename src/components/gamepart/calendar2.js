import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { loadMatches } from "../../features/matches/matcheSlice";
import { loadGameweeks } from "../../features/gameweeks/gameweekSlice.js";
import { savecurrentDomain } from "../../features/currentdomain/currentdomainSlice";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import Spincrescentcomponent from "../../commun/logos/spincrescentcomponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

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

export default function Calendar(props) {
  //you have to make usernav as a redux state to show wich profile ou are on

  const dispatch = useDispatch();
  const gameweeks = useSelector((state) => state.betfundata.gameweeks.list);
  const loadgameweeks = useSelector(
    (state) => state.betfundata.gameweeks.loading
  );
  const matches = useSelector((state) => state.betfundata.matches.list);
  const loadmatches = useSelector((state) => state.betfundata.matches.loading);
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  useEffect(() => {
    dispatch(
      loadGameweeks(`/${props.match.params.seasonId}/${currentdomain.id}`)
    );
    dispatch(
      loadMatches(`/matches/${props.match.params.seasonId}/${currentdomain.id}`)
    );
  }, [props.match.params.seasonId, props.match.params.domainId]);
  //get in component did mount or useeffect the bets of a certain domain

  const classes = useStyles();
  const [gameweekvalue, setGameweekvalue] = React.useState({ nothing: "" });

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
      {loadgameweeks || loadmatches ? (
        <>
          <div className={classes.root}>
            <div
              style={{
                width: "100%",
                height: "40vh",
                position: "absolute",
                display: "flex",

                alignItems: "center",
              }}
            >
              <div style={{ width: 100, marginRight: 5, marginLeft: 10 }}></div>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spincrescentcomponent color="#070427" size="2x" />
              </div>
            </div>
            <Skeleton
              animation="pulse"
              variant="rect"
              height={224}
              className={classes.faketabs}
            />
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Skeleton
                animation="pulse"
                variant="text"
                height={24}
                width={60}
              />
              <Skeleton
                animation="pulse"
                variant="rect"
                height={30}
                width={150}
              />
              <Skeleton
                animation="pulse"
                variant="rect"
                height={40}
                style={{
                  flexGrow: 1,
                  marginTop: 10,
                  borderBottom: `2px solid #e6ab2d`,
                  borderTop: `2px solid #e6ab2d`,
                }}
              />
              {[1, 2, 3, 4, 5].map((s) => (
                <Skeleton
                  key={s}
                  animation="pulse"
                  variant="rect"
                  height={40}
                  style={{
                    flexGrow: 1,

                    borderBottom: `1px solid white`,
                  }}
                />
              ))}
            </div>
          </div>
        </>
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

            <Link
              className="createbetorleagueButton"
              to={`/game/bets/createbet/${"cristiano.ronaldo"}/${
                currentdomain.name
              }/${props.match.params.seasonname}/${
                gameweeks[0] && !gameweekvalue.name
                  ? gameweeks[0].name
                  : gameweekvalue.name
              }/${10}/${
                gameweeks[0] && !gameweekvalue.id
                  ? gameweeks[0].id
                  : gameweekvalue.id
              }`}
            >
              <div>Create Bet</div>
            </Link>
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
                                justifyContent: "flex-end",
                              }}
                            >
                              <div>{mtch.team1}</div>

                              <img
                                src="../../../../../csslogo.png"
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
                                flexGrow: 1,
                              }}
                            >
                              <img
                                src="../../../../../csslogo.png"
                                style={{
                                  width: 25,
                                  marginRight: 5,
                                  marginLeft: 5,
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
        </div>
      )}
    </div>
  );
}

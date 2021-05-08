import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Skeleton from "@material-ui/lab/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { loadLeaguesgenres } from "../../features/leaguesgenres/leaguegenreSlice";
import { loadLeagues } from "../../features/leagues/leagueSlice.js";

import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import LeagueModal from "../../commun/modal";
import CreateLeagueModal from "../../commun/createleague";
import JoinLeagueModal from "../../commun/joinleague";
import SkullLeagues from "../../commun/skulldata";

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

  tabs: {
    height: 224,
    minWidth: 55,
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      marginRight: 2,
    },
  },
}));

export default function LeaguesList(props) {
  //get in component did mount or useeffect the bets of a certain domain
  const dispatch = useDispatch();
  const leaguesgenres = useSelector(
    (state) => state.betfundata.leaguesgenres.list
  );

  const loadingLeaguesGenres = useSelector(
    (state) => state.betfundata.leaguesgenres.loading
  );

  const leaguesGenresError = useSelector(
    (state) => state.betfundata.leaguesgenres.errors.message
  );

  const leagues = useSelector((state) => state.betfundata.leagues.list);
  const loadingLeagues = useSelector(
    (state) => state.betfundata.leagues.loading
  );
  const leaguesError = useSelector(
    (state) => state.betfundata.leagues.errors.message
  );
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  useEffect(() => {
    dispatch(loadLeaguesgenres());
    dispatch(loadLeagues(`/${currentprofile.id}/${currentdomain.id}`));
  }, [props.match.params.id]);

  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ececeb" }}>
      {loadingLeaguesGenres || loadingLeagues ? (
        <SkullLeagues flexDirection="row" justifyContent="space-betweeen">
          <div className="betusermoonnameContainer">
            <Skeleton
              animation="pulse"
              variant="circle"
              height={60}
              width={60}
            />
            <Skeleton
              animation="pulse"
              variant="text"
              height={24}
              width={70}
              style={{ alignSelf: "center", marginLeft: 8 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginRight: 10,
              alignSelf: "center",
            }}
          >
            <Skeleton animation="pulse" variant="rect" height={24} width={75} />
            <Skeleton
              animation="pulse"
              variant="rect"
              height={24}
              width={75}
              style={{ marginLeft: 10 }}
            />
          </div>
        </SkullLeagues>
      ) : (
        <>
          {leaguesGenresError || leaguesError ? (
            <div className="loadingerrorMessage">
              {leaguesGenresError && (
                <div
                  className="betstabLine headerBets"
                  style={{
                    fontSize: 20,
                    backgroundColor: "#ececeb",
                    border: "none",
                  }}
                >
                  {leaguesGenresError}
                </div>
              )}
              {leaguesError && (
                <div
                  className="betstabLine headerBets"
                  style={{
                    fontSize: 20,
                    backgroundColor: "#ececeb",
                    border: "none",
                  }}
                >
                  {leaguesError}
                </div>
              )}
            </div>
          ) : (
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                indicatorColor="primary"
                className={classes.tabs}
                value={leaguesgenres[0] && !value ? leaguesgenres[0].id : value}
                aria-label="Vertical tabs example"
              >
                {leaguesgenres.map((genre) => (
                  <Tab
                    label={genre.name}
                    value={genre.id}
                    className={classes.tab}
                    onClick={() => setValue(genre.id)}
                    style={{ borderRight: `1px solid #e6ab2d` }}
                  />
                ))}
              </Tabs>
              <div className="betsTableAndSelectContainer">
                <div className="betusermoonsortContainer">
                  <div className="betusermoonnameContainer">
                    <Usermoonavatar
                      src="../../../cr7profile.jpg"
                      alt={currentprofile.username}
                      dimentionmoon={65}
                      dimentionimage={55}
                      username={currentprofile.username}
                    />

                    <div className="username">{currentprofile.username}</div>
                  </div>
                  {currentuser.id == currentprofile.id && (
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <CreateLeagueModal
                        userId={currentuser.id}
                        seasonId={leagues[0] && leagues[0].seasonId}
                      />

                      <JoinLeagueModal userId={currentuser.id} />
                    </div>
                  )}
                </div>

                <div className="betsTableContainer" style={{ fontSize: 13 }}>
                  <div className="betstabLine headerBets">
                    <div
                      className="betsTabCellule"
                      style={{
                        width: "40%",
                        fontWeight: "normal",
                        wordBreak: "normal",
                      }}
                    >
                      League
                    </div>
                    <div
                      className="betsTabCellule"
                      style={{
                        width: "10%",
                        minWidth: 30,
                        fontWeight: "normal",
                        wordBreak: "normal",
                      }}
                    />

                    <div
                      className="betsTabCellule"
                      style={{
                        width: "25%",
                        fontWeight: "normal",
                        wordBreak: "normal",
                      }}
                    >
                      Rank
                    </div>
                    <div
                      className="betsTabCellule"
                      style={{
                        width: "25%",
                        fontWeight: "normal",
                        wordBreak: "normal",
                      }}
                    >
                      Last Rank
                    </div>
                  </div>
                  {leagues.map((league) => (
                    <Link
                      to={{
                        pathname: `/game/bet/leaguedetail/${league.name}/${currentdomain.name}/${league.leagueId}/${league.seasonId}`,
                        state: { creatorId: league.creatorId },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <TabPanel
                        value={
                          leaguesgenres[0] && !value
                            ? leaguesgenres[0].id
                            : value
                        }
                        index={league.genreId}
                      >
                        <div
                          className="betsTabCellule"
                          style={{ width: "40%" }}
                        >
                          {league.name}
                        </div>
                        <div
                          className="betsTabCellule"
                          style={{
                            width: "10%",
                            minWidth: 10,
                            fontWeight: "normal",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={
                              league.userRank == league.oldRank ||
                              league.oldRank == "-"
                                ? faCircle
                                : league.userRank > league.oldRank
                                ? faArrowCircleUp
                                : faArrowCircleDown
                            }
                            size="  "
                            color={
                              league.userRank == league.oldRank ||
                              league.oldRank == "-"
                                ? "#838193"
                                : league.userRank > league.oldRank
                                ? "green"
                                : "red"
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div
                          className="betsTabCellule"
                          style={{ width: "25%" }}
                        >
                          {league.userRank}
                        </div>
                        <div
                          className="betsTabCellule"
                          style={{ width: "25%" }}
                        >
                          {league.oldRank}
                        </div>
                      </TabPanel>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { loadLeaguesgenres } from "../../features/leaguesgenres/leaguegenreSlice";
import { loadLeagues } from "../../features/leagues/leagueSlice.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

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
  const leagues = useSelector((state) => state.betfundata.leagues.list);
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  useEffect(() => {
    dispatch(loadLeaguesgenres());
    dispatch(loadLeagues(`/${6}/${currentdomain.id}`));
  }, [props.match.params.id]);

  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
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
                alt="cr7"
                dimentionmoon={65}
                dimentionimage={55}
                boxshadowcolor="#070427"
              />
              <div className="username">
                Cristiano Ronaldo wild mas3oudia inabara
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div
                className="createbetorleagueButton"
                style={{ marginRight: 3, width: 70, fontSize: 15, height: 20 }}
              >
                Join
              </div>
              <div
                className="createbetorleagueButton"
                style={{ width: 70, fontSize: 15, height: 20 }}
              >
                Create
              </div>
            </div>
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
                to={`/game/leaguedetail/${league.name}/${currentdomain.name}/${league.leagueId}/${league.seasonId}`}
                style={{ textDecoration: "none" }}
              >
                <TabPanel
                  value={
                    leaguesgenres[0] && !value ? leaguesgenres[0].id : value
                  }
                  index={league.genreId}
                >
                  <div className="betsTabCellule" style={{ width: "40%" }}>
                    {league.name}malari9hedhi56789025678902
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
                        league.userRank == league.oldRank
                          ? faCircle
                          : league.userRank > league.oldRank
                          ? faArrowCircleUp
                          : faArrowCircleDown
                      }
                      size="  "
                      color={
                        league.userRank == league.oldRank
                          ? "#838193"
                          : league.userRank > league.oldRank
                          ? "green"
                          : "red"
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="betsTabCellule" style={{ width: "25%" }}>
                    {league.userRank}
                  </div>
                  <div className="betsTabCellule" style={{ width: "25%" }}>
                    {league.oldRank}
                  </div>
                </TabPanel>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

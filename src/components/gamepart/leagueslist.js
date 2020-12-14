import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { loadLeaguesgenres } from "../../features/leaguesgenres/leaguegenreSlice";
import { loadLeagues } from "../../features/leagues/leagueSlice.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";

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

export default function LeaguesList(props) {
  //get in component did mount or useeffect the bets of a certain domain
  const dispatch = useDispatch();
  const leaguesgenres = useSelector(
    (state) => state.betfundata.leaguesgenres.list
  );
  const leagues = useSelector((state) => state.betfundata.leagues.list);
  const currentdomainId = useSelector(
    (state) => state.betfundata.currentdomain.data.id
  );
  useEffect(() => {
    dispatch(loadLeaguesgenres());
    dispatch(loadLeagues(`/${6}/${currentdomainId}`));
  }, [props.match.params.id]);

  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <div style={{ marginTop: 100 }}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="primary"
          value={leaguesgenres[0] && !value ? leaguesgenres[0].id : value}
          aria-label="Vertical tabs example"
        >
          {leaguesgenres.map((genre) => (
            <Tab
              label={genre.name}
              value={genre.id}
              onClick={() => setValue(genre.id)}
              style={{ borderRight: `1px solid #e6ab2d` }}
            />
          ))}
        </Tabs>
        <div className="betsTableAndSelectContainer">
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", marginLeft: 50 }}>
              <Usermoonavatar src="../../../cr7profile.jpg" alt="cr7" />
              <h3 style={{ alignSelf: "flex-end" }}>Cristiano Ronaldo</h3>
            </div>
          </div>

          <div className="betsTableContainer">
            <div className="betstabLine headerBets">
              <div className="betsTabCellule">League</div>
              <div className="betsTabCellule">joined-at</div>
              <div className="betsTabCellule"></div>
            </div>
            {leagues.map((league) => (
              <TabPanel
                value={leaguesgenres[0] && !value ? leaguesgenres[0].id : value}
                index={league.genreId}
              >
                <div className="betsTabCellule">{league.name}</div>
                <div className="betsTabCellule">{league.created_at}</div>
                <div className="betsTabCellule">options</div>
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

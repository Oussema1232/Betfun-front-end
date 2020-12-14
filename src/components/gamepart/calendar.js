import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
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

export default function VerticalTabs(props) {
  //you have to make usernav as a redux state to show wich profile ou are on

  const dispatch = useDispatch();
  const gameweeks = useSelector((state) => state.betfundata.gameweeks.list);
  const matches = useSelector((state) => state.betfundata.matches.list);
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  useEffect(() => {
    dispatch(loadGameweeks(`/${currentdomain.id}`));
    dispatch(
      loadMatches(`/matches/${props.match.params.seasonId}/${currentdomain.id}`)
    );
  }, [props.match.params.seasonId, props.match.params.domainId]);
  //get in component did mount or useeffect the bets of a certain domain

  const classes = useStyles();
  const [value, setValue] = React.useState();
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

  return (
    <div style={{ marginTop: 100 }}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="primary"
          value={gameweeks[0] && !value ? gameweeks[0].id : value}
          aria-label="Vertical tabs example"
        >
          {gameweeks.map((g) => (
            <Tab
              label={g.name}
              value={g.id}
              onClick={() => setValue(g.id)}
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
            <div>{props.match.params.seasonname}</div>
          </div>

          <div className="betsTableContainer">
            {matches.map((m) => (
              <>
                {m.days.map((matche) => (
                  <>
                    <>
                      {matche.matches[0].gameweekId ==
                        (value ? value : gameweeks[0].id) && (
                        <div className="betstabLine headerBets">
                          {matche.day}
                        </div>
                      )}
                    </>
                    {matche.matches.map((mtch) => (
                      <TabPanel
                        value={gameweeks[0] && !value ? gameweeks[0].id : value}
                        index={mtch.gameweekId}
                      >
                        <div className="betsTabCellule">{mtch.matchs}</div>
                        <div className="betsTabCellule">{mtch.time}</div>
                      </TabPanel>
                    ))}
                  </>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

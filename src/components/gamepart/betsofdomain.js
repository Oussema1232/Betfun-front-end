import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { loadSeasons } from "../../features/seasons/seasonSlice";
import { loadBets } from "../../features/bets/betSlice.js";
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
  const seasons = useSelector((state) => state.betfundata.seasons.list);
  const bets = useSelector((state) => state.betfundata.bets.list);
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  useEffect(() => {
    dispatch(loadSeasons(`/${currentdomain.id}`));
    dispatch(loadBets(`/all/seasons/${10}/${currentdomain.id}`));
  }, [props.match.params.id]);
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
          value={seasons[0] && !value ? seasons[0].id : value}
          aria-label="Vertical tabs example"
        >
          {seasons.map((s) => (
            <Tab
              label={s.name}
              value={s.id}
              onClick={() => setValue(s.id)}
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sort-by">Sorted By</InputLabel>
              <NativeSelect
                value={state.Sorted_By}
                onChange={handleChangeSort}
                inputProps={{
                  name: "Sorted_By",
                  id: "sort-by",
                }}
              >
                <option aria-label="None" value="" />
                <option value="asc">Points ascendant</option>
                <option value="desc">Points descendant</option>
              </NativeSelect>
              {/* <FormHelperText>Some important helper text</FormHelperText> */}
            </FormControl>
          </div>

          <div className="betsTableContainer">
            <div className="betstabLine headerBets">
              <div className="betsTabCellule">Gameweek</div>
              <div className="betsTabCellule">Played at</div>
              <div className="betsTabCellule">Points</div>
            </div>
            {state.Sorted_By != ""
              ? _.orderBy(bets, "points", state.Sorted_By).map((bet) => (
                  <Link
                    to={`/yourgame/betguess/${currentdomain.name}/${bet.id}`}
                  >
                    <TabPanel
                      value={seasons[0] && !value ? seasons[0].id : value}
                      index={bet.seasonId}
                    >
                      <div className="betsTabCellule">{bet.gameweekname}</div>
                      <div className="betsTabCellule">{bet.created_at}</div>
                      <div className="betsTabCellule">
                        {bet.points ? bet.points : "TBD"}
                      </div>
                    </TabPanel>
                  </Link>
                ))
              : bets.map((bet) => (
                  <Link
                    to={`/yourgame/betguess/${currentdomain.name}/${bet.id}`}
                  >
                    <TabPanel
                      value={seasons[0] && !value ? seasons[0].id : value}
                      index={bet.seasonId}
                    >
                      <div className="betsTabCellule">{bet.gameweekname}</div>
                      <div className="betsTabCellule">{bet.created_at}</div>
                      <div className="betsTabCellule">
                        {bet.points ? bet.points : "TBD"}
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

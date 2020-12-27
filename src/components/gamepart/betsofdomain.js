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

    display: "flex",
  },

  formControl: {
    margin: theme.spacing(1),

    minWidth: 80,
    maxWidth: 200,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      margin: 0,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
    [theme.breakpoints.down("sm")]: {
      marginRight: 2,
    },
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
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          indicatorColor="primary"
          className={classes.tabs}
          value={seasons[0] && !value ? seasons[0].id : value}
          aria-label="Vertical tabs example"
        >
          {seasons.map((s) => (
            <Tab
              label={s.name}
              value={s.id}
              onClick={() => setValue(s.id)}
              className={classes.tab}
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

              <h3 style={{ alignSelf: "flex-end", fontSize: 15 }}>
                Cristiano Ronaldo
              </h3>
            </div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sort-by" style={{ fontSize: 13 }}>
                Sorted By
              </InputLabel>
              <NativeSelect
                value={state.Sorted_By}
                onChange={handleChangeSort}
                inputProps={{
                  name: "Sorted_By",
                  id: "sort-by",
                }}
              >
                <option aria-label="None" value="" />
                <option value="asc">Pts asc</option>
                <option value="desc">Pts desc</option>
              </NativeSelect>
            </FormControl>
          </div>

          <div className="betsTableContainer" style={{ fontSize: 13 }}>
            <div className="betstabLine headerBets">
              <div
                className="betsTabCellule"
                style={{
                  width: "50%",
                  fontWeight: "normal",
                  wordBreak: "normal",
                }}
              >
                GW
              </div>
              <div
                className="betsTabCellule"
                style={{
                  width: "30%",
                  fontWeight: "normal",
                  wordBreak: "normal",
                }}
              >
                Played at
              </div>
              <div
                className="betsTabCellule"
                style={{
                  width: "20%",
                  minWidth: 45,
                  fontWeight: "normal",
                  wordBreak: "normal",
                }}
              >
                Pts
              </div>
            </div>
            {state.Sorted_By != ""
              ? _.orderBy(bets, "points", state.Sorted_By).map((bet) => (
                  <Link
                    to={`/game/betguess/${currentdomain.name}/${bet.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <TabPanel
                      value={seasons[0] && !value ? seasons[0].id : value}
                      index={bet.seasonId}
                    >
                      <div className="betsTabCellule" style={{ width: "50%" }}>
                        {bet.gameweekname}
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{
                          width: "30%",
                          display: "flex",
                          flexDirection: "column",
                          fontWeight: "bold",
                        }}
                      >
                        <div className="playedatBetDate">{bet.date}</div>
                        <div className="playedatBetTime">{bet.time}</div>
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{ width: "20%", minWidth: 45 }}
                      >
                        {bet.points ? bet.points : "TBD"}
                      </div>
                    </TabPanel>
                  </Link>
                ))
              : bets.map((bet) => (
                  <Link
                    to={`/game/betguess/${currentdomain.name}/${bet.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <TabPanel
                      value={seasons[0] && !value ? seasons[0].id : value}
                      index={bet.seasonId}
                    >
                      <div className="betsTabCellule" style={{ width: "50%" }}>
                        {bet.gameweekname}hacilou hedhi loula
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{
                          width: "30%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div className="playedatBetDate">{bet.date}</div>
                        <div className="playedatBetTime">{bet.time}</div>
                      </div>
                      <div
                        className="betsTabCellule"
                        style={{ width: "20%", minWidth: 45 }}
                      >
                        {bet.points ? bet.points : "TBD"}323
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

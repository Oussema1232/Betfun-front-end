import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import NativeSelect from "@material-ui/core/NativeSelect";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Skeleton from "@material-ui/lab/Skeleton";
import { loadSeasons } from "../../features/seasons/seasonSlice";
import { loadBets } from "../../features/bets/betSlice.js";

import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import SkullBets from "../../commun/skulldata";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
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
    borderRight: `1px solid #f9a828`,
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
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      marginRight: 2,
      display: "flex",
      flexDirection: "column",
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Betsofdomain(props) {
  //you have to make usernav as a redux state to show wich profile ou are on

  const dispatch = useDispatch();
  const seasons = useSelector((state) => state.betfundata.seasons.list);

  const loadingSeasons = useSelector(
    (state) => state.betfundata.seasons.loading
  );
  const seasonsError = useSelector(
    (state) => state.betfundata.seasons.errors.message
  );
  const matches = useSelector((state) => state.betfundata.matches.list);
  const bets = useSelector((state) => state.betfundata.bets.list);
  const loadingBets = useSelector((state) => state.betfundata.bets.loading);
  const betsError = useSelector(
    (state) => state.betfundata.bets.errors.message
  );

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);

  useEffect(() => {
    dispatch(loadSeasons(`/${currentdomain.id}`));
    dispatch(loadBets(`/all/seasons/${currentprofile.id}/${currentdomain.id}`));
  }, [props.match.params.id, currentprofile.id]);
  //get in component did mount or useeffect the bets of a certain domain

  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [state, setState] = React.useState({
    Sorted_By: "",
  });
  const [accessdenied, setAccessdenied] = React.useState({
    denied: false,
    message: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleChangeSort = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goToBetdetails = (bet) => {
    setAccessdenied({ denied: false, message: "" });

    if (
      currentuser.id !== currentprofile.id &&
      matches[0].days[0].matches[0] &&
      moment(matches[0].days[0].matches[0].played_on).diff(
        moment(),
        "minutes"
      ) > 60
    ) {
      setAccessdenied({
        denied: true,
        message:
          "You can't access bet details of other Bettors until one hour before the gameweek starts.",
      });
    } else {
      props.history.push(`/game/bet/betguess/${currentdomain.name}/${bet.id}`);
    }
    setOpen(true);
  };

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ececeb" }}>
      {loadingSeasons || loadingBets ? (
        <SkullBets flexDirection="row" justifyContent="space-between">
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
          <Skeleton
            animation="pulse"
            variant="rect"
            height={24}
            width={85}
            style={{ alignSelf: "center", marginRight: 10 }}
          />
        </SkullBets>
      ) : (
        <>
          {seasonsError || betsError ? (
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
                {seasonsError} ...
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
                {betsError} ...
              </div>
            </div>
          ) : (
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
                      alt={currentprofile.username}
                      dimentionmoon={65}
                      dimentionimage={55}
                      username={currentprofile.username}
                    />

                    <div className="username">{currentprofile.username}</div>
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
                  {bets[0] ? (
                    <>
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
                        ? _.orderBy(bets, "points", state.Sorted_By).map(
                            (bet) => (
                              <TabPanel
                                value={
                                  seasons[0] && !value ? seasons[0].id : value
                                }
                                index={bet.seasonId}
                                onClick={() => {
                                  goToBetdetails(bet);
                                }}
                              >
                                <div
                                  className="betsTabCellule"
                                  style={{ width: "50%" }}
                                >
                                  {bet.gameweekname}
                                </div>
                                <div
                                  className="betsTabCellule"
                                  style={{
                                    width: "30%",
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div className="playedatBetDate">
                                    {bet.date}
                                  </div>
                                  <div className="playedatBetTime">
                                    {bet.time}
                                  </div>
                                </div>
                                <div
                                  className="betsTabCellule"
                                  style={{ width: "20%", minWidth: 45 }}
                                >
                                  {bet.points == null ? "TBD" : bet.points}
                                </div>
                              </TabPanel>
                            )
                          )
                        : bets.map((bet) => (
                            <TabPanel
                              value={
                                seasons[0] && !value ? seasons[0].id : value
                              }
                              index={bet.seasonId}
                              onClick={() => {
                                goToBetdetails(bet);
                              }}
                            >
                              <div
                                className="betsTabCellule"
                                style={{ width: "50%" }}
                              >
                                {bet.gameweekname}
                              </div>
                              <div
                                className="betsTabCellule"
                                style={{
                                  width: "30%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div className="playedatBetDate">
                                  {bet.date}
                                </div>
                                <div className="playedatBetTime">
                                  {bet.time}
                                </div>
                              </div>
                              <div
                                className="betsTabCellule"
                                style={{ width: "20%", minWidth: 45 }}
                              >
                                {bet.points == null ? "TBD" : bet.points}
                              </div>
                            </TabPanel>
                          ))}
                    </>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 20,
                      }}
                    >
                      {`No bets yet${
                        currentuser.id == currentprofile.id &&
                        `, go to Calendar to create your first bet`
                      }`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {accessdenied.denied && (
        <Snackbar
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning">
            <AlertTitle>Access denied</AlertTitle>
            {accessdenied.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

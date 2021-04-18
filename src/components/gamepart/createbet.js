import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import SkullCreateBet from "../../commun/skulldata";
import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import {
  loadMatches,
  sousListMatchguessescreated,
} from "../../features/matches/matcheSlice";
import { createBet } from "../../features/bets/betSlice.js";
import Islamiccolumn from "../../commun/logos/islamiccolumn2";
import Betdetail from "../../commun/betdetail";
import Usermoonavatar from "../../commun/usermoonavatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
    boxSizing: "border-box",

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateBet(props) {
  //you have to make usernav as a redux state to show wich profile ou are on
  const [open, setOpen] = React.useState(false);
  const [timeIsUp, setTimeIsUp] = React.useState({ isUp: false, message: "" });

  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const matches = useSelector((state) => state.betfundata.matches.list);
  const matchesError = useSelector(
    (state) => state.betfundata.matches.errors.message
  );
  const loadingmatches = useSelector(
    (state) => state.betfundata.matches.loading
  );

  const betdetails = useSelector((state) => state.betfundata.matches.souslist);
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  const loadingCreateBet = useSelector(
    (state) => state.betfundata.bets.loadingCreate
  );
  const CreateBetSuccess = useSelector(
    (state) => state.betfundata.bets.onCreateSuccess.message
  );
  const CreateBetError = useSelector(
    (state) => state.betfundata.bets.errors.message
  );

  const handleClose = () => {
    setOpen(false);
  };

  const guesseslist = [
    { value: "1", name: "1" },
    { value: "x", name: "x" },
    { value: "2", name: "2" },
  ];

  const submitBet = () => {
    let firstMatchTime = matches[0].days[0].matches[0].played_on;
    setTimeIsUp({ isUp: false, message: "" });
    if (moment(firstMatchTime).diff(moment(), "minutes") > 60) {
      dispatch(
        createBet({
          userId: currentuser.id,
          gameweekId: props.match.params.gameweekId,
          betdetails: betdetails,
        })
      );
    } else {
      setTimeIsUp({
        isUp: true,
        message: "Time is up, You can't Create a Bet",
      });
    }
    setOpen(true);
  };

  useEffect(() => {
    dispatch(loadMatches(`/matches/${props.match.params.gameweekId}`));
  }, [props.match.params.gameweekId]);
  //get in component did mount or useeffect the bets of a certain domain

  const classes = useStyles();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ececeb" }}>
      {loadingmatches ? (
        <SkullCreateBet
          flexDirection="row"
          justifyContent="space-between"
          dontshowtabs={true}
        >
          <div
            className="betusermoonnameContainer"
            style={{ marginBottom: 10 }}
          >
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
            variant="text"
            height={24}
            width={80}
            style={{ alignSelf: "center", marginRight: 10 }}
          />
        </SkullCreateBet>
      ) : (
        <>
          {matches[0].days[0].matches[0] &&
          moment(matches[0].days[0].matches[0].played_on).diff(
            moment(),
            "minutes"
          ) < 60 ? (
            <>
              {matchesError ? (
                <div className="loadingerrorMessage">
                  <div
                    className="betstabLine headerBets"
                    style={{
                      minHeight: 100,
                      fontSize: 20,
                      backgroundColor: "#ede5e5",
                      border: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {matchesError} ...
                  </div>
                </div>
              ) : (
                <div className={classes.root}>
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

                        <div className="username">
                          {currentprofile.username}
                        </div>
                      </div>
                      <div style={{ fontWeight: "bold", marginRight: 30 }}>
                        {props.match.params.seasonname}
                      </div>
                    </div>

                    <div className="betsTableContainer">
                      {matches.map((m) => (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",

                              flexGrow: 1,
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
                                  <Betdetail
                                    guesseslist={guesseslist}
                                    betdetail={mtch}
                                    label={true}
                                    widthselect={70}
                                    showsmalldate={false}
                                    firstempty={true}
                                    updateguess={sousListMatchguessescreated}
                                    disabled={
                                      matches[0].days[0].matches[0] &&
                                      moment().diff(
                                        moment(
                                          matches[0].days[0].matches[0]
                                            .played_on
                                        ),
                                        "minutes"
                                      ) < 60
                                    }
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {matches[0].days[0].matches[0] &&
                      moment(matches[0].days[0].matches[0].played_on).diff(
                        moment(),
                        "minutes"
                      ) > 60 && (
                        <div
                          className="createbetorleagueButton buttonsubmit"
                          style={{
                            width: 80,
                            fontSize: 15,
                            height: 20,
                            minHeight: 20,
                          }}
                          onClick={() => {
                            submitBet();
                          }}
                        >
                          {loadingCreateBet ? (
                            <Spincrescentcomponenet size="1x" color="white" />
                          ) : (
                            "Send"
                          )}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className="betstabLine headerBets"
              style={{
                minHeight: 100,
                fontSize: 20,
                backgroundColor: "#ede5e5",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Time is Up! The first match of this bet starts in one hour! Good
              luck next Time Bettor
            </div>
          )}
        </>
      )}
      {(CreateBetSuccess || CreateBetError || timeIsUp.isUp) && (
        <Snackbar
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={CreateBetSuccess ? "success" : "error"}>
            <AlertTitle>{CreateBetSuccess ? "Success" : "Error"}</AlertTitle>
            {CreateBetSuccess ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Islamiccolumn showmouth={true} dance={false} />
                <div style={{ marginLeft: 6 }}>{CreateBetSuccess}</div>
              </div>
            ) : CreateBetError ? (
              CreateBetError
            ) : (
              timeIsUp.message
            )}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

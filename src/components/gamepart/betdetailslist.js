import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { loadBetdetails } from "../../features/betdetails/betdetailSlice";
import {
  sousListBetdetailsUpdated,
  editbetdetailsguesses,
} from "../../features/betdetails/betdetailSlice";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import InputLabel from "@material-ui/core/InputLabel";
import SkullBetdetails from "../../commun/skulldata";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import NativeSelect from "@material-ui/core/NativeSelect";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Skeleton from "@material-ui/lab/Skeleton";
import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import Betdetail from "../../commun/betdetail";
import { Divider } from "@material-ui/core";

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

export default function BetdetailsList(props) {
  //get in component did mount or useeffect the bets of a certain domain
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [timeIsUp, setTimeIsUp] = React.useState({ isUp: false, message: "" });

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const newguesseslist = useSelector(
    (state) => state.betfundata.betdetails.souslist
  );

  const betdetails = useSelector((state) => state.betfundata.betdetails.list);
  const betdetailsError = useSelector(
    (state) => state.betfundata.betdetails.errors.message
  );
  const loadingBetdetails = useSelector(
    (state) => state.betfundata.betdetails.loading
  );

  const loadingUpdateBetdetails = useSelector(
    (state) => state.betfundata.betdetails.updatedetailsLoading
  );
  const UpdateBetdetailsSuccess = useSelector(
    (state) => state.betfundata.betdetails.onUpdatesuccess.message
  );

  const handleClose = () => {
    setOpen(false);
  };

  const guesseslist = [
    { value: "'1'", name: "1" },
    { value: "'x'", name: "x" },
    { value: "'2'", name: "2" },
  ];

  const handleUpdate = () => {
    let firstMatchTime = betdetails[0].played_on;
    setTimeIsUp({ isUp: false, message: "" });

    if (moment(firstMatchTime).diff(moment(), "minutes") > 60) {
      dispatch(editbetdetailsguesses(props.match.params.betId, newguesseslist));
    } else {
      setTimeIsUp({
        isUp: true,
        message: "Time is up, You can't update your bet",
      });
    }
    setOpen(true);
  };

  useEffect(() => {
    dispatch(loadBetdetails(`/${props.match.params.betId}`));
  }, [props.match.params.betId]);

  const classes = useStyles();

  return (
    <div style={{ marginTop: 100, backgroundColor: "#ede5e5" }}>
      {loadingBetdetails ? (
        <SkullBetdetails
          flexDirection="row"
          justifyContent="space-between"
          dontshowtabs={true}
          dontshowheader={true}
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
        </SkullBetdetails>
      ) : (
        <>
          {betdetailsError ? (
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
                {betdetailsError} ...
              </div>
            </div>
          ) : (
            <div className={classes.root}>
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
                    <div className="username">Cristiano Ronaldo</div>
                  </div>

                  {betdetails[0] && (
                    <div
                      style={{ fontWeight: "bold", marginRight: 30 }}
                    >{`GW : ${betdetails[0].gameweekname}`}</div>
                  )}
                </div>

                <div className="betsTableContainer">
                  {betdetails.map((betdetail) => (
                    <Betdetail
                      guesseslist={guesseslist}
                      betdetail={betdetail}
                      showsmalldate={true}
                      showresults={true}
                      initialValue={`'${betdetail.guess}'`}
                      updateguess={sousListBetdetailsUpdated}
                      disabled={
                        betdetails[0] &&
                        moment(betdetails[0].played_on).diff(
                          moment(),
                          "minutes"
                        ) > 60
                      }
                    />
                  ))}
                </div>
                {betdetails[0] &&
                  !(
                    moment(betdetails[0].played_on).diff(moment(), "minutes") >
                    60
                  ) && (
                    <div
                      className="createbetorleagueButton buttonsubmit"
                      style={{
                        width: 80,
                        fontSize: 15,
                        height: 20,
                        minHeight: 20,
                      }}
                      onClick={() => {
                        handleUpdate();
                      }}
                    >
                      {loadingUpdateBetdetails ? (
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
      )}
      {(UpdateBetdetailsSuccess || betdetailsError || timeIsUp.isUp) && (
        <Snackbar
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={UpdateBetdetailsSuccess ? "success" : "error"}>
            <AlertTitle>
              {UpdateBetdetailsSuccess ? "Success" : "Error"}
            </AlertTitle>
            {UpdateBetdetailsSuccess
              ? UpdateBetdetailsSuccess
              : betdetailsError
              ? betdetailsError
              : timeIsUp.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

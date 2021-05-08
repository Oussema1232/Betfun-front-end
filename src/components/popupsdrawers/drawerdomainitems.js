import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "./style.css";

export default function MyDrawer(props) {
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );

  const more = [
    {
      id: 0,

      domainnavbaritem: "Bet",
      pathname: `/game/bet/bets/${currentdomain.name}/${currentdomain.id}`,
    },
    {
      id: 1,
      domainnavbaritem: "Leagues",
      pathname: `/game/bet/leagues/${currentdomain.name}/${currentdomain.id}`,
    },
    {
      id: 2,
      domainnavbaritem: "Fixtures",
      pathname: `/game/bet/fixtures/${currentdomain.name}/${
        props.theLatestseason ? props.theLatestseason.name : "noseason"
      }/${currentdomain.id}/${
        props.theLatestseason ? props.theLatestseason.id : "noseason"
      }`,
    },
    {
      id: 3,
      domainnavbaritem: "Calendar",
    },
    {
      id: 4,
      domainnavbaritem: "Levels",
      pathname: `/game/bet/levels/${currentdomain.name}/${currentdomain.id}`,
    },
    {
      id: 5,
      domainnavbaritem: "Titles",
    },
  ];

  const drawerWidth = 275;
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      fontSize: 35,
      fontWeight: "bold",
      fontFamily: "'Indie Flower', cursive",
      cursor: "default",
      // color: "#000",
      color: "#fbfbfb",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    drawerPaper: {
      width: drawerWidth,

      backgroundColor: "#2e383f",
      borderLeft: "2px solid #f9a828",
      boxSizing: "border-box",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      padding: 0,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      // padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    iconbutton: {
      width: 60,
      color: "#fbfbfb",
    },
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    accordion: {
      // backgroundColor: "#F2F3F5",
      backgroundColor: " #2e383f",
      width: "100%",

      boxShadow: "none",
      padding: 0,
    },
    accordionsummary: {
      // backgroundColor: "#F2F3F5",
      backgroundColor: " #2e383f",
      display: "flex",
      justifyContent: "space-between",

      alignItems: "center",
      padding: 5,

      minHeight: 50,

      color: "#fbfbfb",
      "&:hover": {
        backgroundColor: "#424b52",
        cursor: "pointer",
      },
    },
    accordiondetails: {
      display: "flex",

      flexDirection: "column",
      backgroundColor: "#f9a828",
      padding: 0,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="drawer">
      <SwipeableDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        style={{ backgroundColor: "#2e383f" }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={props.handleDrawerClose}
            className={classes.iconbutton}
          >
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#fbfbfb",
            }}
          >
            <div>Betfun</div>
          </div>
        </div>
        <Divider />
        {more.map((c, index) => (
          <>
            {c.id !== 3 && c.id !== 5 ? (
              <Link
                key={c.id}
                to={c.pathname && c.pathname}
                style={{ textDecoration: "none", color: "#fbfbfb" }}
              >
                <div
                  key={index}
                  className="drawerdomainItem"
                  onClick={props.handleDrawerClose}
                >
                  <div>{c.domainnavbaritem}</div>
                </div>
              </Link>
            ) : (
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  className={classes.accordionsummary}
                  expandIcon={<ExpandMoreIcon style={{ color: "#fbfbfb" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>{c.domainnavbaritem}</div>
                </AccordionSummary>
                {c.id == 3 ? (
                  <AccordionDetails className={classes.accordiondetails}>
                    {props.theseasonsError ? (
                      <div
                        className="drawerseason"
                        style={{ backgroundColor: "#f44336" }}
                      >
                        {props.theseasonsError}
                      </div>
                    ) : (
                      <>
                        {props.unfinishedseasons.length >= 1 ? (
                          <>
                            {props.unfinishedseasons.map((s) => (
                              <Link
                                key={s.id}
                                style={{ textDecoration: "none" }}
                                to={`/game/bet/calendar/${currentdomain.name}/${s.name}/${currentdomain.id}/${s.id}`}
                              >
                                <div
                                  className="drawerseason"
                                  onClick={props.handleDrawerClose}
                                >
                                  {s.name}
                                </div>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <div
                            className="drawerseason"
                            style={{ backgroundColor: "#fbfbfb" }}
                          >
                            No seasons yet
                          </div>
                        )}
                      </>
                    )}
                  </AccordionDetails>
                ) : (
                  <AccordionDetails className={classes.accordiondetails}>
                    {props.theseasonsError ? (
                      <div
                        className="drawerseason"
                        style={{ backgroundColor: "#f44336" }}
                      >
                        {props.theseasonsError}
                      </div>
                    ) : (
                      <>
                        {props.theFinishedseasons.length >= 1 ? (
                          <>
                            {props.theFinishedseasons.map((s) => (
                              <Link
                                key={s.id}
                                style={{ textDecoration: "none" }}
                                to={`/game/bet/titles/${currentdomain.name}/${s.name}/${currentdomain.id}/${s.id}`}
                              >
                                <div
                                  className="drawerseason"
                                  onClick={props.handleDrawerClose}
                                >
                                  {s.name}
                                </div>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <div
                            className="drawerseason"
                            style={{ backgroundColor: "#fbfbfb" }}
                          >
                            Ongoing seasons, no titles yet
                          </div>
                        )}
                      </>
                    )}
                  </AccordionDetails>
                )}
              </Accordion>
            )}
          </>
        ))}
        {currentuser.id !== currentprofile.id && (
          <Link
            key={6}
            to={`/game/bet/stats/${currentdomain.name}/${currentdomain.id}/${currentprofile.username}/${currentprofile.id}`}
            style={{ textDecoration: "none", color: "#fbfbfb" }}
          >
            <div
              key={6}
              className="drawerdomainItem"
              onClick={props.handleDrawerClose}
            >
              <div>Stats</div>
            </div>
          </Link>
        )}
        {currentuser.isAdmin == 1 && (
          <Link
            key={7}
            to={`/game/bet/teams/${currentdomain.name}/${currentdomain.id}`}
            style={{ textDecoration: "none", color: "#fbfbfb" }}
          >
            <div key={7} className="drawerdomainItem">
              <div>Teams</div>
            </div>
          </Link>
        )}
      </SwipeableDrawer>
    </div>
  );
}

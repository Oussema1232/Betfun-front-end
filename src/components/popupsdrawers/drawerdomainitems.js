import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "./style.css";

export default function MyDrawer(props) {
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );

  const more = [
    {
      id: 0,

      domainnavbaritem: "Bet",
      pathname: `/betfun/game/bets/${currentdomain.name}/${currentdomain.id}`,
    },
    {
      id: 1,
      domainnavbaritem: "Leagues",
      pathname: `/betfun/game/leagues/${currentdomain.name}/${currentdomain.id}`,
    },
    {
      id: 2,
      domainnavbaritem: "Fixtures",
      pathname: `/betfun/game/fixtures/${currentdomain.name}/${props.theLatestseason.name}/${currentdomain.id}/${props.theLatestseason.id}`,
    },
    {
      id: 3,
      domainnavbaritem: "Calendar",
    },
    {
      id: 4,
      domainnavbaritem: "Levels",
      pathname: `/betfun/game/levels/${currentdomain.name}/${currentdomain.id}`,
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
      color: "#d5cece",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    drawerPaper: {
      width: drawerWidth,

      // backgroundColor: "#F2F3F5",
      backgroundColor: "#070427",
      borderLeft: "2px solid #ffff00",
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
      color: "#d5cece",
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
      backgroundColor: " #070427",
      width: "100%",

      boxShadow: "none",
      padding: 0,
    },
    accordionsummary: {
      // backgroundColor: "#F2F3F5",
      backgroundColor: " #070427",
      display: "flex",
      justifyContent: "space-between",

      alignItems: "center",
      padding: 5,

      minHeight: 50,

      color: "#d5cece",
      "&:hover": {
        backgroundColor: "#1f1d3c",
        cursor: "pointer",
      },
    },
    accordiondetails: {
      display: "flex",

      flexDirection: "column",
      backgroundColor: "#Fefefe",
      padding: 0,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="drawer">
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        style={{ backgroundColor: "#971243" }}
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
              color: "#d5cece",
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
                style={{ textDecoration: "none", color: "#d5cece" }}
              >
                <div key={index} className="drawerdomainItem">
                  <div>{c.domainnavbaritem}</div>
                </div>
              </Link>
            ) : (
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  className={classes.accordionsummary}
                  expandIcon={<ExpandMoreIcon style={{ color: "#eeeeee" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>{c.domainnavbaritem}</div>
                </AccordionSummary>
                {c.id == 3 ? (
                  <AccordionDetails className={classes.accordiondetails}>
                    {props.seasons.map((s) => (
                      <Link
                        key={s.id}
                        style={{ textDecoration: "none" }}
                        to={`/game/calendar/${currentdomain.name}/${s.name}/${currentdomain.id}/${s.id}`}
                      >
                        <div className="drawerseason">{s.name}</div>
                      </Link>
                    ))}
                  </AccordionDetails>
                ) : (
                  <AccordionDetails className={classes.accordiondetails}>
                    {props.theseasonsError ? (
                      <div
                        className="drawerseason"
                        style={{ backgroundColor: "#fbf9f9" }}
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
                                to={`/game/titles/${currentdomain.name}/${s.name}/${currentdomain.id}/${s.id}`}
                              >
                                <div className="drawerseason">{s.name}</div>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <div
                            className="drawerseason"
                            style={{ backgroundColor: "#cdccd3" }}
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
      </Drawer>
    </div>
  );
}

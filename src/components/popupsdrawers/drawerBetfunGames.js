import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6, faQuran } from "@fortawesome/free-solid-svg-icons";
import { savecurrentDomain } from "../../features/currentdomain/currentdomainSlice";
import { savecurrentProfile } from "../../features/currentprofile/currentprofileSlice";
import { loadUserdomains } from "../../features/userdomains/userdomainSlice";
import Knowledge from "../questionsparts/categoriesbackdrop";

import "./style.css";

export default function MyDrawerDomains(props) {
  const dispatch = useDispatch();

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#eeeeee",
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
      backgroundColor: " #2e383f",
      width: "100%",

      boxShadow: "none",
      padding: 0,
    },
    accordionsummary: {
      backgroundColor: " #2e383f",
      display: "flex",
      justifyContent: "space-between",

      alignItems: "center",
      padding: 5,

      minHeight: 50,

      color: "#d5cece",
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

  const userdomains = useSelector((state) => state.betfundata.userdomains.list);

  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentpathname = useSelector(
    (state) => state.router.location.pathname
  );

  const more = [
    {
      id: 0,

      domainnavbaritem: "Bet Domains",
    },
    {
      id: 1,
      domainnavbaritem: "knowledge",
      pathname: `/knowledge/categories`,
    },
  ];

  useEffect(() => {
    dispatch(loadUserdomains(`/${currentuser.id}`));
  }, []);

  return (
    <div>
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
            <div>Betfun Domains</div>
          </div>
        </div>
        <Divider />
        {more.map((c, index) => (
          <>
            {c.id !== 0 ? (
              <Link
                key={c.id}
                to={{
                  pathname: c.pathname && c.pathname,
                  state: { fromwhere: currentpathname },
                }}
                style={{ textDecoration: "none", color: "#d5cece" }}
              >
                <div
                  key={index}
                  className="drawerdomainItem"
                  style={{
                    cursor: "pointer",

                    color: "#d5cece",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faQuran}
                    size="lg"
                    color="#f9a828"
                    style={{ cursor: "pointer", marginRight: 10 }}
                  />
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
                  <FontAwesomeIcon
                    icon={faDiceD6}
                    size="lg"
                    color="#f9a828"
                    style={{ cursor: "pointer", marginRight: 10 }}
                  />
                  <div>{c.domainnavbaritem}</div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordiondetails}>
                  {userdomains.map((d) => (
                    <Link
                      key={d.id}
                      style={{ textDecoration: "none" }}
                      to={`/betfun/game/bets/${d.domainname}/${d.id}`}
                    >
                      <div
                        className="drawerseason"
                        onClick={() => {
                          dispatch(savecurrentDomain(d));
                          dispatch(
                            savecurrentProfile({
                              id: currentuser.id,
                              username: currentuser.username,
                            })
                          );
                        }}
                      >
                        {d.domainname}
                      </div>
                    </Link>
                  ))}
                </AccordionDetails>
                
              </Accordion>
            )}
          </>
        ))}
      </Drawer>
    </div>
  );
}

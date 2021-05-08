import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6, faQuran } from "@fortawesome/free-solid-svg-icons";
import { savecurrentDomain } from "../../features/currentdomain/currentdomainSlice";
import { savecurrentProfile } from "../../features/currentprofile/currentprofileSlice";
import { loadUserdomains } from "../../features/userdomains/userdomainSlice";

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

      color: "#fbfbfb",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fbfbfb",
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
      <SwipeableDrawer
        className={classes.drawer}
        open={props.open}
        anchor="right"
        style={{ backgroundColor: "#2e383f" }}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={props.handleDrawerClose}
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
                style={{ textDecoration: "none", color: "#fbfbfb" }}
              >
                <div
                  key={index}
                  className="drawerdomainItem"
                  style={{
                    cursor: "pointer",

                    color: "#fbfbfb",
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
                  expandIcon={<ExpandMoreIcon style={{ color: "#fbfbfb" }} />}
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
                      to={`/game/bet/bets/${d.domainname}/${d.id}`}
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
      </SwipeableDrawer>
    </div>
  );
}

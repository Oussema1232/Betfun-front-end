import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function MyDrawer(props) {
  const dispatch = useDispatch();
  const drawerWidth = 275;
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      fontSize: 35,
      fontWeight: "bold",
      fontFamily: "'Indie Flower', cursive",
      cursor: "default",
      color: "#000",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    drawerPaper: {
      width: drawerWidth,
      // backgroundColor: "#fbfbfb",
      borderRight: "2px solid #d4d4d3",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",

      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    iconbutton: {
      width: 60,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <SwipeableDrawer
        className={classes.drawer}
        open={props.open}
        anchor="right"
        style={{ backgroundColor: "#f5f5f5" }}
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {props.title.icon && <div>{props.title.icon}</div>}
            <div>{props.title.name}</div>
          </div>
        </div>
        <Divider />
        {props.content.map((c, index) => (
          <Link
            key={c.id}
            to={
              c.domainname
                ? `/game/bet/bets/${c.domainname}/${c.id}`
                : c.pathname && c.pathname
            }
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              key={index}
              className="drawerItem"
              onClick={() => {
                props.onclickItem && dispatch(props.onclickItem(c));
                props.handleDrawerClose();
              }}
            >
              {c.icon && (
                <div
                  style={{
                    width: 35,
                    display: "flex",
                  }}
                >
                  {c.icon}
                </div>
              )}
              {c.name && <div>{c.name}</div>}
            </div>
          </Link>
        ))}
      </SwipeableDrawer>
    </div>
  );
}

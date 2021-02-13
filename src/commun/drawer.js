import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import clsx from "clsx";
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
      backgroundColor: "#F2F3F5",
      borderRight: "2px solid #CCC",
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
                ? `/game/bets/${c.domainname}/${c.id}`
                : c.communityname
                ? `/communities/${c.communityname}/${c.id}`
                : c.pathname && c.pathname
            }
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              key={index}
              className="drawerItem"
              onClick={() => {
                props.onclickItem && dispatch(props.onclickItem(c));
              }}
            >
              {c.icon && <div style={{ marginRight: 10 }}>{c.icon}</div>}
              {c.name && <div>{c.name}</div>}
              {c.domainname && <div>{c.domainname}</div>}
              {c.communityname && <div>{c.communityname}</div>}
            </div>
          </Link>
        ))}
      </Drawer>
    </div>
  );
}

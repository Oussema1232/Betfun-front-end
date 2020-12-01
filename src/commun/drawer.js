import React, { useState } from "react";
import { motion } from "framer-motion";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export default function MyDrawer(props) {
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
      // padding: theme.spacing(0, 1),
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {props.title.icon && <div>{props.title.icon}</div>}
            <div>{props.title.name}</div>
          </div>
        </div>
        <Divider />
        {props.content.map((c) => (
          <div
            className="drawerItem"
            style={{
              display: "flex",
              alignItems: "center",
              padding: 5,
              minHeight: 50,
            }}
          >
            {c.icon && <div style={{ width: 60 }}>{c.icon}</div>}
            <div>{c.name}</div>
          </div>
        ))}
      </Drawer>
    </div>
  );
}

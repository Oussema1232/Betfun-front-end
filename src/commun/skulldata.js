import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import Spincrescentcomponent from "./logos/spincrescentcomponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    boxSizing: "border-box",

    display: "flex",
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
}));

export default function Calendar(props) {
  //you have to make usernav as a redux state to show wich profile ou are on

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        style={{
          width: "100%",
          height: "40vh",
          position: "absolute",
          display: "flex",

          alignItems: "center",
        }}
      >
        <div style={{ width: 100, marginRight: 5, marginLeft: 10 }}></div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spincrescentcomponent color="#070427" size="2x" />
        </div>
      </div>
      {!props.dontshowtabs && (
        <Skeleton
          animation="pulse"
          variant="rect"
          height={224}
          className={classes.faketabs}
        />
      )}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: props.justifyContent
              ? props.justifyContent
              : "flex-start",
            flexDirection: props.flexDirection,
          }}
        >
          {props.children}
        </div>
        {!props.dontshowheader && (
          <Skeleton
            animation="pulse"
            variant="rect"
            height={40}
            style={{
              flexGrow: 1,
              marginTop: 10,
              backgroundColor: "#e6e5e9",
              borderTop: `1px solid #b4b3be`,
            }}
          />
        )}
        {[1, 2, 3, 4, 5].map((s) => (
          <Skeleton
            key={s}
            animation="pulse"
            variant="rect"
            height={40}
            style={{
              flexGrow: 1,

              borderTop: `1px solid white`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

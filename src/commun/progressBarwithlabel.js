import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div
          style={{
            color: "#171717",
            fontSize: 10,
            fontWeight: "normal",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.label}
        </div>
      </Box>
    </Box>
  );
}



export default function ProgressBarWithLabel(props) {
  return (
    <CircularProgressWithLabel
      color={props.progress == 0 ? "secondary" : "primary"}
      value={props.progress == 0 ? 100 : props.progress}
      label={
        Math.round(props.progress) <= 0
          ? `${0}%`
          : `${Math.round(props.progress)}%`
      }
    />
  );
}

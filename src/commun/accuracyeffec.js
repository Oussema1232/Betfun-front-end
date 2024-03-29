import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import ProgressBarWithLabel from "./progressBarwithlabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    color: "#171717",
    width: "100%",
  },

  selectcontainer: {
    color: "#171717",
    fontSize: 9,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      fontSize: 13,
    },

    "&:before": {
      borderColor: "#171717",
    },
    "&:after": {
      borderColor: "#171717",
    },
  },
  icon: {
    fill: "rgba(0,0,0,0.5)",
    display: "none",
  },
}));

export default function AccuracyEffec({
  accuracy,
  efficiency,
  name,
  value,
  list,
  changeselect,
  allseasons,
  canselect = true,
}) {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        minHeight: 50,
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      {canselect ? (
        <div style={{ width: "33%" }}>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="selectedvalue"
              style={{ fontSize: 13, color: "#171717" }}
            >
              {name}
            </InputLabel>
            <NativeSelect
              value={value}
              className={classes.selectcontainer}
              onChange={(e) => changeselect(e)}
              inputProps={{
                name: name,
                id: name,
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              {list.map((l) => (
                <option style={{ color: "#171717" }} value={l.id}>
                  {l.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      ) : (
        <div
          style={{
            width: "33%",
            color: "#171717",
            display: "flex",
            fontWeight: "normal",
            alignItems: "center",
            fontSize: 13,
          }}
        >
          {allseasons}
        </div>
      )}
      <div
        style={{
          width: "33%",
          color: "#171717",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProgressBarWithLabel progress={accuracy} />
      </div>
      <div
        style={{
          width: "33%",
          color: "#171717",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProgressBarWithLabel progress={efficiency} />
      </div>
    </div>
  );
}

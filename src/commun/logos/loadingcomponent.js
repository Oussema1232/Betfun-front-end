import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";

const LoadingComponent = ({ show }) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      justifyContent: "center",

      color: "#eeeeee",
    },
  }));
  const classes = useStyles();
  return show ? (
    <Backdrop className={classes.backdrop} open={true}>
      <div className="mooncontainer">
        <div className="moon">
          <svg viewBox="0 -30 288 231.12">
            <polygon
              class="staricon"
              points="141.89,49.99 155.88,93.05 198.52,95.3 164.47,122.89 175.57,166.9 140.54,140.89 104.76,165.84 
	117.16,122.18 83.95,93.59 126.63,92.61 "
            />
          </svg>
        </div>
      </div>
    </Backdrop>
  ) : null;
};

export default LoadingComponent;

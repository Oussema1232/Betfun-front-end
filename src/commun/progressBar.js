import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularStatic(props) {
  // const [progress, setProgress] = React.useState(props.progressinitialvalue);

  React.useEffect(() => {
    const timer = setInterval(() => {
      
      props.beginTime();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      variant="determinate"
      value={props.progress}
      color={props.progress < 80 ? "primary" : "secondary"}
      size={65}
    />
  );
}

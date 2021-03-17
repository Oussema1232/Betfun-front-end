import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fbfbfb",

    border: "2px solid #07617d",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LeagueModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);

    props.onclickButton && props.onclickButton();
  };

  const handleClose = () => {
    setOpen(false);
    props.onclosemodal && props.onclosemodal();
  };

  return (
    <div>
      <div
        className="createbetorleagueButton"
        onClick={handleOpen}
        style={{ marginLeft: 3, width: 70, fontSize: 15, height: 20 }}
      >
        {props.buttonname}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>{props.children}</div>
        </Fade>
      </Modal>
    </div>
  );
}

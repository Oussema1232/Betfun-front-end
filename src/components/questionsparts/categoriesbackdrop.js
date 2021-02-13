import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CategoryIcon from "../../commun/logos/categoryIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSound from "use-sound";
import popup from "../../sounds/popup.mp3";
import back from "../../img/vintageback.jpg";

import {
  faDiceD6,
  faHistory,
  faMapMarkedAlt,
  faAtom,
  faBookReader,
  faUserAstronaut,
  faRunning,
  faHandshake,
  faMusic,
  faCoins,
  faGlobe,
  faAlignJustify,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

export default function Categories(props) {
  const icons = [
    {
      id: 1,
      name: faAlignJustify,
      title: "All",
      color: "#f01b2d",
      delay: 0.1,
      y: [-2, 2],
    },
    {
      id: 2,
      name: faGlobe,
      title: "Culture",
      color: "blue",
      delay: 0.15,
      y: [2, -2],
    },
    {
      id: 3,
      name: faHistory,
      title: "History",
      color: "#008161",
      delay: 0.2,
      y: [-2, 2],
    },
    {
      id: 4,
      name: faMapMarkedAlt,
      title: "Giography",
      color: "#f4821f",
      delay: 0.25,
      y: [2, -2],
    },
    {
      id: 5,
      name: faAtom,
      title: "Science",
      color: "#0a4244",
      delay: 0.3,
      y: [-2, 2],
    },
    {
      id: 6,
      name: faBookReader,
      title: "Literature",
      color: "#d55538",
      delay: 0.35,
      y: [2, -2],
    },
    {
      id: 7,
      name: faUserAstronaut,
      title: "Astronomy",
      color: "#cfad0e",
      delay: 0.4,
      y: [-2, 2],
    },
    {
      id: 8,
      name: faRunning,
      title: "Sports",
      color: "#1181fc",
      delay: 0.45,
      y: [-2, 2],
    },
    {
      id: 9,
      name: faHandshake,
      title: "Politics",
      color: "#921127",
      delay: 0.5,
      y: [-2, 2],
    },
    {
      id: 10,
      name: faMusic,
      title: "Music",
      color: "#97084e",
      delay: 0.55,
      y: [-2, 2],
    },
    {
      id: 11,
      name: faCoins,
      title: "Economy",
      color: "#ea2d5e",
      delay: 0.6,
      y: [-2, 2],
    },
  ];

  const [open, setOpen] = React.useState(true);
  const [play] = useSound(popup, { volume: 0.3 });

  const handleClose = () => {
    setOpen(false);
    props.history.push(props.location.state.fromwhere);
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#070427",
      backgroundImage: `url(${back})`,
      backgroundRepeat: "repeat",
      // backgroundSize: "contain",
      color: "#eeeeee",
    },
  }));

  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <div
        style={{
          minHeight: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // border: "1px solid yellow",
        }}
      >
        <motion.div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            cursor: "pointer",
            // border: "1px solid blue",
          }}
          onClick={handleClose}
          initial={{ scale: 0.7 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2 }}
        >
          <FontAwesomeIcon icon={faTimesCircle} size="2x" color="#eeeeee" />
        </motion.div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: 410,
            // border: "1px solid white",
            marginBottom: 25,
          }}
        >
          {icons.map((icon) => (
            <motion.div
              initial={{ y: -1000 }}
              animate={{
                y: 0,
                transition: {
                  delay: icon.delay,
                  type: "spring",
                  stiffness: 100,
                },
              }}
              onClick={() => setOpen(false)}
              onMouseEnter={() => play()}
            >
              <Link
                key={0}
                to={`/knowledge/learngame/${icon.title}/${icon.id}`}
                style={{
                  textDecoration: "none",
                  color: "#02010f",
                }}
              >
                <CategoryIcon
                  iconTitle={icon.title}
                  iconName={icon.name}
                  backgroundcolor={icon.color}
                  y={icon.y}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Backdrop>
  );
}

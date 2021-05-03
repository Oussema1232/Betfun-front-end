import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import useSound from "use-sound";
import popup from "../../sounds/popup.mp3";
import back from "../../img/vintageback.jpg";
import { loadCategories } from "../../features/categories/categorySlice";
import { savecurrentCategory } from "../../features/currentcategory/currentcategorySlice";
import http from "../../services/httpService";
import { changeLanguage } from "../../features/currentuser/currentuserSlice";
import CategoryIcon from "../../commun/logos/categoryIcon";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

export default function Categories(props) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.betfundata.categories.list);
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);

  useEffect(() => {
    dispatch(loadCategories(`/${currentuser.language}`));
  }, []);

  const all = [
    {
      id: "All",
      Arabname: "جميع الفئات",
      Engname: "All",
      color: "#f01b2d",
      delay: 0.1,
    },
  ];

  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [play] = useSound(popup, { volume: 0.3 });

  const handleClose = () => {
    setOpen(false);
    props.history.push(
      props.location.state ? props.location.state.fromwhere : "/game/welcome"
    );
  };
  const [language, setLanguage] = useState(currentuser.language);

  const handleChange = async (event) => {
    const language = event.target.value;
    setErrormessage("");
    setLanguage(language);
    try {
      setLoading(true);

      const response = await http.put(
        `https://betfunbackend1.herokuapp.com/api/params/language/${currentuser.id}`,
        {
          language,
        }
      );

      dispatch(
        changeLanguage({
          language,
        })
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setErrormessage(err.response.data.message);
      }
      setLanguage(currentuser.language);
    }
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#070427",
      backgroundImage: `url(${back})`,
      backgroundRepeat: "repeat",
      overflow: "auto",

      color: "#eeeeee",
    },
    formControl: { width: 65, marginBottom: 4 },
    select: {
      color: "#eeeeee",
      fontWeight: "bold",
      borderBottom: "2px solid #eee",
    },
    icon: { color: "#eeeeee" },
  }));

  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <div
        className="categoriescontainer"
        style={{
          minHeight: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily:
            currentuser.language == "Eng"
              ? "'Patrick Hand SC', cursive"
              : "'Katibeh', cursive",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl className={classes.formControl}>
            <Select
              labelId="language"
              id="languageselect"
              value={language}
              onChange={handleChange}
              className={classes.select}
              classes={{ icon: classes.icon }}
            >
              <MenuItem value={"Eng"}>Eng</MenuItem>
              <MenuItem value={"Arab"}>العربية</MenuItem>
            </Select>
          </FormControl>
          {loading && <Spincrescentcomponenet color="#eeeeee" size="1x" />}
          {errormessage && (
            <div
              style={{
                color: "#eeeeee",
                fontSize: 15,
                marginTop: 4,
                fontFamily:
                  currentuser.language == "Eng"
                    ? "'Patrick Hand SC', cursive"
                    : "'Katibeh', cursive",
              }}
            >
              {currentuser.language == "Eng" ? "Failed" : "حدث خطأ"}
            </div>
          )}
        </div>
        <motion.div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            cursor: "pointer",
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
            maxWidth: 420,
            marginBottom: 25,
          }}
        >
          {[...all, ...categories].map((icon) => (
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
                onClick={() =>
                  dispatch(
                    savecurrentCategory({
                      Arabname: icon.Arabname,
                      Engname: icon.Engname,
                      id: icon.id,
                    })
                  )
                }
                key={0}
                to={`/knowledge/learngame/${
                  currentuser.language == "Eng" ? icon.Engname : icon.Arabname
                }/${icon.id}`}
                style={{
                  textDecoration: "none",
                  color: "#02010f",
                  fontSize: 20,
                }}
              >
                <CategoryIcon
                  iconTitle={
                    currentuser.language == "Eng" ? icon.Engname : icon.Arabname
                  }
                  iconName={icon.Engname}
                  backgroundcolor={icon.color}
                  y={icon.id % 2 == 0 ? [2, -2] : [-2, 2]}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Backdrop>
  );
}

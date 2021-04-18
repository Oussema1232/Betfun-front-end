import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Joi from "joi-browser";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import blackpaper from "../../img/blackpaper.jpg";
import mozher from "../../img/back.jpg";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { postSuggestion } from "../../features/suggestions/suggestionSlice";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import Usermoonavatar from "../../commun/usermoonavatar";

import "./style.css";

export default function Addquestion(props) {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const successmessagepost = useSelector(
    (state) => state.betfundata.suggestions.onsuccesspost.message
  );
  const errormessagepost = useSelector(
    (state) => state.betfundata.suggestions.errorspost.message
  );
  const loadingpostsuggestion = useSelector(
    (state) => state.betfundata.suggestions.loadingpost
  );

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      justifyContent: "center",

      color: "#eeeeee",
    },
    description: {
      width: "99%",
      marginTop: 10,
      borderRadius: 3,
    },
    answer: {
      width: "99%",
      marginTop: 10,
      borderRadius: 3,
    },

    input: {
      color: "#02010f",
      fontFamily: "'Indie Flower', cursive",
      fontSize: 23,
      textAlign: currentuser.language == "Arab" ? "end" : "start",
      direction: currentuser.language == "Arab" ? "RTL" : "",
    },
  }));

  const classes = useStyles();

  const [data, setData] = useState({ description: "", answer: "" });

  const [state, setState] = useState({
    loading: false,
    writing: false,
    errors: {},
    message: "",
  });

  const schema = {
    description: Joi.string().required().min(10).label("Question"),
    answer: Joi.string().required().label("Answer"),
  };

  const onchange = ({ currentTarget: input }) => {
    let datastate = { ...data };
    datastate[input.name] = input.value;

    const errors = validateProprety(input.name, input.value);
    setData(datastate);
    let oldstate = { ...state };
    oldstate.errors = errors || {};
    oldstate.writing = true;
    setState(oldstate);
  };

  const validation = () => {
    const options = { abortEarly: false };
    const formdata = data;
    let dataaftertrim = {};
    _.forEach(formdata, function (value, key) {
      dataaftertrim[key] = value.trim();
    });

    const { error } = Joi.validate(dataaftertrim, schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map((err) => (errors[err.path[0]] = err.message));
    return errors;
  };

  const validateProprety = (name, value) => {
    const formschema = { [name]: schema[name] };
    const data = { [name]: value };
    const { error } = Joi.validate(data, formschema);
    if (!error) return null;
    const errors = {};
    errors[name] = error.details[0].message;
    return errors;
  };

  const onSubmit = () => {
    const errors = validation();
    let oldstate = { ...state };
    oldstate.errors = errors || {};
    if (errors) return setState(oldstate);
    setState({
      loading: false,
      errors: {},
      writing: false,
      message: "",
    });
    dispatch(
      postSuggestion(`/${currentuser.id}/${currentuser.language}`, data)
    );
    if (!errormessagepost && successmessagepost)
      setData({ description: "", answer: "" });
  };

  const rtl = (element) => {
    if (element.setSelectionRange && currentuser.language == "Arab") {
      element.setSelectionRange(0, 0);
    }
  };

  return (
    <div
      className="cool addquestionContainer"
      style={{
        backgroundImage: `url(${blackpaper})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "97.02%",
          justifyContent:
            currentuser.language == "Arab" ? "flex-end" : "flex-start",
        }}
      >
        <div
          className="betusermoonnameContainer"
          style={{ alignSelf: "flex-start", flexGrow: 0, marginLeft: 20 }}
        >
          <Usermoonavatar
            style={{
              backgroundImage: `url(${mozher})`,
              backgroundRepeat: "repeat",
              fontSize: 35,
            }}
            alt={currentuser.username}
            dimentionmoon={65}
            dimentionimage={55}
            boxshadowcolor="#07617d"
            username={currentuser.username}
          />

          <div
            className="username"
            style={{ fontFamily: "'Indie Flower', cursive", marginTop: 5 }}
          >
            {currentuser.username}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          flexGrow: 1,
          width: "98%",
        }}
      >
        <TextField
          className={classes.description}
          placeholder={
            currentuser.language == "Arab"
              ? "اقترح سؤالا"
              : "Suggest a question"
          }
          onKeyUp={(e) => rtl(e)}
          error={state.errors.description}
          id="description"
          name="description"
          multiline
          rows={6}
          rowsMax={8}
          variant="outlined"
          InputProps={{ className: classes.input }}
          onChange={onchange}
        />
        <div
          style={{
            display: "flex",
            width: "99%",
            justifyContent:
              currentuser.language == "Arab" ? "flex-end" : "flex-start",
          }}
        >
          {state.errors.description ? (
            <div
              className="errorclass"
              style={{
                fontSize: 15,
                textAlign: currentuser.language == "Arab" ? "end" : "start",
              }}
            >
              {state.errors.description}
            </div>
          ) : errormessagepost ? (
            <div
              className="errorclass"
              style={{
                fontSize: 15,

                textAlign: currentuser.language == "Arab" ? "end" : "start",
              }}
            >
              {errormessagepost}
            </div>
          ) : (
            successmessagepost &&
            !state.writing && (
              <div
                className="errorclass"
                style={{
                  color: "green",
                  fontSize: 15,
                  textAlign: currentuser.language == "Arab" ? "end" : "start",
                  width: "100%",
                }}
              >
                {successmessagepost}
              </div>
            )
          )}
        </div>
        <TextField
          className={classes.answer}
          onKeyUp={(e) => rtl(e)}
          error={state.errors.answer}
          id="answer"
          name="answer"
          multiline
          rowsMax={3}
          variant="outlined"
          placeholder={currentuser.language == "Arab" ? "الاجابة" : "Answer"}
          InputProps={{ className: classes.input }}
          onChange={onchange}
        />
        <div
          style={{
            display: "flex",
            width: "99%",
            justifyContent:
              currentuser.language == "Arab" ? "flex-end" : "flex-start",
          }}
        >
          {state.errors.answer && (
            <div
              className="errorclass"
              style={{
                fontSize: 15,
                textAlign: currentuser.language == "Arab" ? "end" : "start",
              }}
            >
              {state.errors.answer}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            width: "99%",
            justifyContent:
              currentuser.language == "Arab" ? "flex-end" : "flex-start",
          }}
        >
          <motion.div
            onClick={onSubmit}
            initial={{
              border: "1px dashed black",
            }}
            whileHover={{
              borderStyle: "solid",
              borderColor: "#0055a5",
            }}
            style={{
              display: "flex",
              width: 100,
              cursor: "pointer",
              marginTop: 8,
              borderRadius: 5,
              fontSize: 23,
              fontWeight: "bold",
              alignItems: "center",
              justifyContent: "space-between",
              color: "black",
              padding: 5,
              flexDirection:
                currentuser.language == "Arab" ? "row-reverse" : "row",
            }}
          >
            <div style={{ marginRight: 4 }}>
              {currentuser.language == "Arab" ? "أرسل" : "Send"}
            </div>
            {!state.loading && !loadingpostsuggestion ? (
              <SendIcon
                color="error"
                style={{
                  transform:
                    currentuser.language == "Arab"
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              />
            ) : (
              <Spincrescentcomponenet color="#07617d" size="1x" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

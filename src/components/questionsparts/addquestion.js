import React, { useState } from "react";
import { motion } from "framer-motion";
import Joi from "joi-browser";
import _ from "lodash";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { savecurrentUser } from "../../features/currentuser/currentuserSlice";
import auth from "../../services/authService";
import Input from "@material-ui/core//Input";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import LoadingComponent from "../../commun/logos/loadingcomponent";
import http from "../../services/httpService";
import Usermoonavatar from "../../commun/usermoonavatar";
import Backdrop from "@material-ui/core/Backdrop";
import blackpaper from "../../img/blackpaper.jpg";
import mozher from "../../img/back.jpg";
import backbutton from "../../img/backbutton.jpg";
import SendIcon from "@material-ui/icons/Send";
import {
  fade,
  makeStyles,
  withStyles,
  useTheme,
} from "@material-ui/core/styles";
import { red, purple } from "@material-ui/core/colors";
import "./style.css";

export default function Addquestion(props) {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      justifyContent: "center",

      color: "#eeeeee",
    },
    question: {
      backgroundColor: "#f8f5de",
      width: "99%",
      marginTop: 10,
      borderRadius: 3,
    },
    answer: {
      backgroundColor: "#f8f5de",
      width: "98%",
      marginTop: 10,
      borderRadius: 3,
    },

    input: {
      color: "#02010f",
      fontFamily: "'Indie Flower', cursive",
      fontSize: 23,
    },
  }));

  const classes = useStyles();

  const [data, setData] = useState({ question: "", answer: "" });

  const [state, setState] = useState({
    loading: false,
    errors: {},
    message: "",
  });

  const schema = {
    question: Joi.string().required().min(10).label("Question"),
    answer: Joi.string().required().label("Answer"),
  };

  const onchange = ({ currentTarget: input }) => {
    let datastate = { ...data };
    datastate[input.name] = input.value;

    const errors = validateProprety(input.name, input.value);
    setData(datastate);
    setState({ ...state, errors: errors || {} });
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

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validation();
    if (errors) return setState(...state, { errors } || {});

    dosubmit();
  };

  const sendrequest = async () => {
    setState(...state, ...state, {
      message: "",

      showform: false,
      loading: true,
    });

    const token = props.location.pathname.slice(
      props.location.pathname.lastIndexOf("/") + 1
    );

    const pathname = props.location.pathname.slice(
      1,
      props.location.pathname.lastIndexOf("/")
    );
    setState(...state, { message: "", showmessage: false });
    try {
      const response = await http.post(
        `http://localhost:3001/api/confirmation/${token}`,
        { data: pathname }
      );
      setState(...state, {
        showform: true,
        email: response.data.data,
        loading: false,
        emailtoken: token,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setState(...state, {
          message: err.response.data.message,
          loading: false,
        });
      }
    }
  };

  const dosubmit = async () => {
    setState(...state, { loading: true, message: "" });
    try {
      const response = await http.post(
        `http://localhost:3001/api/resetpassword/${state.emailtoken}`,
        { userpassword: state.data.userpassword }
      );
      await auth.login(state.email, state.data.userpassword);
      props.savecurrentUser();
      props.history.replace("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setState(...state, {
          reseterror: err.response.data.message,
        });
      }
      setState(...state, { loading: false });
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
      <div style={{ alignSelf: "flex-start", marginLeft: 20 }}>
        <Usermoonavatar
          dimentionmoon={65}
          dimentionimage={55}
          boxshadowcolor="#0055a5"
          style={{
            backgroundImage: `url(${mozher})`,
            backgroundRepeat: "repeat",
            fontSize: 35,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "98%",
        }}
      >
        <TextField
          className={classes.question}
          placeholder="Suggest a question"
          error={state.errors.question}
          id="question"
          name="question"
          multiline
          rows={4}
          rowsMax={8}
          variant="outlined"
          InputProps={{ className: classes.input }}
          onChange={onchange}
        />
        {state.errors.question && (
          <div className="errorclass">{state.errors.question}</div>
        )}
        <TextField
          className={classes.answer}
          error={state.errors.answer}
          id="answer"
          name="answer"
          multiline
          rowsMax={2}
          variant="outlined"
          placeholder="Answer"
          InputProps={{ className: classes.input }}
          onChange={onchange}
        />
        {state.errors.answer && (
          <div className="errorclass">{state.errors.answer}</div>
        )}

        <motion.div
          initial={{
            border: "1px dashed black",
          }}
          whileHover={{
            borderStyle: "solid",
            borderColor: "#0055a5",
          }}
          style={{
            display: "flex",
            // borderBottom: "2px solid black",
            width: 100,
            marginTop: 8,
            borderRadius: 5,
            fontSize: 23,
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "space-between",
            color: "black",
            padding: 5,
          }}
        >
          <div style={{ marginRight: 4 }}>Send</div>

          <SendIcon color="error" />
        </motion.div>
      </div>
    </div>
  );
}

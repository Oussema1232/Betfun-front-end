import React, { Component } from "react";
import back from "../../img/vintageback.jpg";
import ProgressBar from "../../commun/progressBar";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import backquest from "../../img/backquest.jpg";
import borderimage from "../../img/frondmat.jpg";
import * as knowledgedata from "./questionsservice";

import "./style.css";

export default class Playround extends Component {
  constructor() {
    super();
    this.state = {
      answerColor: "rgba(68,119,178,0.5)",
      clickable: true,
      updatestate: true,
      show: { one: true, two: true, three: true, four: true },
      complete: false,
      numbcorrectanswers: 0,
      progressinitialvalue: 0,
      progress: 0,
      n: 0,
      score: 0,
    };

    this.timer = 0;

    this.difficilty = {
      id: 1,
      name: "Medium",
      coef: 0.6,
      numbmincorrectanswers: 6,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updatestate) {
      if (this.state.progress === 100) {
        if (
          this.state.n == 9 ||
          10 - (this.state.n + 1) + this.state.numbcorrectanswers <
            this.difficilty.numbmincorrectanswers
        ) {
          this.setState({
            complete: true,
            updatestate: false,
          });
          clearInterval(this.timer);
        } else {
          this.setState({
            progress: 0,
            n: prevState.n + 1,
          });
        }
      }
    }
  }

  timeprogress = () => {
    this.setState((state) => ({
      progress: state.progress >= 100 ? 0 : state.progress + 10,
    }));
  };

  clickAnswer = (answername, answershow) => {
    if (this.state.clickable) {
      let {
        show: newshow,
        answerColor: newcolor,
        score: newscore,
        numbcorrectanswers: newnumbcorrectanswers,
        n: newn,
      } = this.state;
      newshow = {
        one: false,
        two: false,
        three: false,
        four: false,
      };

      newshow[answershow] = true;

      this.setState({
        show: newshow,
        answerColor: "#ffae19",
        clickable: false,
      });

      setTimeout(() => {
        if (
          knowledgedata.questions[newn].correctAnswer ==
          knowledgedata.questions[newn][answername]
        ) {
          newscore += knowledgedata.questions[newn].cote * this.difficilty.coef;
          newnumbcorrectanswers += 1;
          newcolor = "green";
        } else {
          newcolor = "red";
        }

        this.setState({
          answerColor: newcolor,
          score: newscore,
          numbcorrectanswers: newnumbcorrectanswers,
        });
      }, 800);

      setTimeout(() => {
        if (
          10 - (this.state.n + 1) + this.state.numbcorrectanswers <
            this.difficilty.numbmincorrectanswers ||
          newn == knowledgedata.questions.length - 1
        ) {
          this.setState({ complete: true, updatestate: false });
          clearInterval(this.timer);
        } else {
          this.setState({
            answerColor: "rgba(68,119,178,0.5)",
            clickable: true,
            show: { one: true, two: true, three: true, four: true },
            complete: false,
            progress: 0,
            n: newn + 1,
          });
        }
      }, 1500);
    }
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#eeeeee",
          backgroundImage: `url(${back})`,
          backgroundRepeat: "repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5,
          boxSizing: "border-box",
        }}
      >
        {!this.state.complete ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 30,
                fontWeight: "bold",
                color: "black",
                fontSize: 25,
                minHeight: 40,
                boxSizing: "border-box",
                width: "98%",
                maxWidth: 800,
                padding: 12,
                backgroundColor: "rgba(169,121,71,0.5)",
                border: "2px dashed black",
              }}
            >
              {knowledgedata.questions[this.state.n].description}
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: 20,
                paddingBottom: 30,
                flexGrow: 1,
                boxSizing: "border-box",
                // border: "1px solid blue",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <AnimatePresence>
                  {this.state.show.one && (
                    <motion.div
                      initial={{
                        border: "1px dashed black",
                      }}
                      whileHover={{
                        borderColor: this.state.clickable ? "#F4F1C9" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      exit={{ x: -1000, transition: { duration: 0.2 } }}
                      whileTap={{
                        borderColor: this.state.clickable ? "#F4F1C9" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      onClick={() => {
                        this.clickAnswer("answerOne", "one");
                      }}
                      style={{
                        backgroundColor: this.state.answerColor,
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                        width: "40%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 70,
                        wordBreak: "break-all",
                        boxSizing: "border-box",
                        padding: 4,
                        borderRadius: 5,
                      }}
                    >
                      {knowledgedata.questions[this.state.n].answerOne}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ flexGrow: 1 }}></div>
                <AnimatePresence>
                  {this.state.show.two && (
                    <motion.div
                      initial={{
                        border: "1px dashed black",
                      }}
                      whileHover={{
                        borderColor: this.state.clickable ? "#ffae19" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      exit={{ x: 1000, transition: { duration: 0.2 } }}
                      whileTap={{
                        borderColor: this.state.clickable ? "#ffae19" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      onClick={() => {
                        this.clickAnswer("answerTwo", "two");
                      }}
                      style={{
                        backgroundColor: this.state.answerColor,
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                        width: "40%",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 70,
                        wordBreak: "break-all",
                        boxSizing: "border-box",
                        padding: 4,
                        borderRadius: 5,
                      }}
                    >
                      {knowledgedata.questions[this.state.n].answerTwo}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                style={{
                  flexGrow: 1,
                  minHeight: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "green",
                  width: "100%",
                }}
              >
                <AnimatePresence>
                  {this.state.show.one &&
                    this.state.show.two &&
                    this.state.show.three &&
                    this.state.show.four &&
                    !this.state.complete && (
                      <motion.div
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      >
                        <ProgressBar
                          // progressinitialvalue={this.state.progressinitialvalue}
                          beginTime={this.timeprogress}
                          progress={this.state.progress}
                        />
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <div
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <AnimatePresence>
                  {this.state.show.three && (
                    <motion.div
                      initial={{
                        border: "1px dashed black",
                      }}
                      whileHover={{
                        borderColor: this.state.clickable ? "#ffae19" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      exit={{ x: -1000, transition: { duration: 0.2 } }}
                      whileTap={{
                        borderColor: this.state.clickable ? "#ffae19" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      onClick={() => {
                        this.clickAnswer("answerThree", "three");
                      }}
                      style={{
                        backgroundColor: this.state.answerColor,
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                        width: "40%",
                        border: "1px solid #eeeeee",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 70,
                        wordBreak: "break-all",
                        boxSizing: "border-box",
                        padding: 4,
                        borderRadius: 5,
                      }}
                    >
                      {knowledgedata.questions[this.state.n].answerThree}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ flexGrow: 1 }}></div>
                <AnimatePresence>
                  {this.state.show.four && (
                    <motion.div
                      initial={{
                        border: "1px dashed black",
                      }}
                      whileHover={{
                        borderColor: this.state.clickable ? "#ffae19" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      exit={{ x: 1000, transition: { duration: 0.2 } }}
                      whileTap={{
                        borderColor: this.state.clickable ? "#ffae19" : "black",
                        borderWidth: this.state.clickable ? "5px" : "1px",
                        borderStyle: this.state.clickable ? "solid" : "dashed",
                      }}
                      onClick={() => {
                        this.clickAnswer("answerFour", "four");
                      }}
                      style={{
                        backgroundColor: this.state.answerColor,
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                        width: "40%",
                        border: "1px solid #eeeeee",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 70,
                        wordBreak: "break-all",
                        boxSizing: "border-box",
                        padding: 4,

                        borderRadius: 5,
                      }}
                    >
                      {knowledgedata.questions[this.state.n].answerFour}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <div>This round is completed</div>
        )}
      </div>
    );
  }
}

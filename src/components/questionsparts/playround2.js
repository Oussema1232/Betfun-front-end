import React, { Component } from "react";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Wronganswers from "./wronganswers";
import Welldone from "./welldone";
import {
  loadRound,
  sousListroundupdated,
} from "../../features/round/roundSlice";
import back from "../../img/vintageback.jpg";
import AnswerItem from "../../commun/answerItem";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import QuestionItem from "../../commun/questionItem";
import ProgressBar from "../../commun/progressBar";

import "./style.css";

class Playround extends Component {
  state = {
    answerColor: "#f8f5de",
    clickable: true,
    updatestate: true,
    show: { one: true, two: true, three: true, four: true },
    complete: false,
    numbcorrectanswers: 0,
    progress: 0,
    n: 0,
    score: 0,
  };

  Engerroranswers = `You have exceeded the maximum number of wrong answers. Sorry Bettor,
  better luck next Time`;

  Araberroranswers =
    "لقد تجاوزت الحد الأقصى لعدد الإجابات الخاطئة, حظ أفضل في المرة القادمة";

  componentDidMount() {
    this.props.loadRound(
      `/${this.props.currentcategory.id}/${this.props.currentuser.language}`
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updatestate) {
      if (this.state.progress === 100) {
        if (
          this.state.n == 9 ||
          10 - (this.state.n + 1) + this.state.numbcorrectanswers <
            this.props.location.state.difficultychosen.minCorrect
        ) {
          this.setState({
            complete: true,
            updatestate: false,
          });
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

  clickAnswer = (answername, answershow, userAnswer) => {
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
        answerColor: "#f9a828",
        clickable: false,
      });

      this.props.sousListroundupdated(userAnswer);

      setTimeout(() => {
        if (
          this.props.round[newn].EngCorrectAnswer ==
          this.props.round[newn][answername]
        ) {
          newscore +=
            this.props.round[newn].cote *
            this.props.location.state.difficultychosen.coefficient;
          newnumbcorrectanswers += 1;
          newcolor = "#458B00";
        } else {
          newcolor = "#f22a2a";
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
            this.props.location.state.difficultychosen.minCorrect ||
          newn == this.props.round.length - 1
        ) {
          this.setState({ complete: true, updatestate: false });
        } else {
          this.setState({
            answerColor: "#f8f5de",
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

  replay = () => {
    this.setState({
      answerColor: "#f8f5de",
      clickable: true,
      updatestate: true,
      show: { one: true, two: true, three: true, four: true },
      complete: false,
      numbcorrectanswers: 0,
      progress: 0,
      n: 0,
      score: 0,
    });
    this.props.loadRound(
      `/${this.props.currentcategory.id}/${this.props.currentuser.language}`
    );
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
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5,
          boxSizing: "border-box",
        }}
      >
        {!this.state.complete &&
        this.props.round[0] &&
        !this.props.loadinground ? (
          <>
            <QuestionItem round={this.props.round} n={this.state.n} />
            <div
              style={{
                width: "100%",
                paddingTop: 20,
                paddingBottom: 30,
                flexGrow: 1,
                boxSizing: "border-box",

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
                <AnswerItem
                  n={this.state.n}
                  round={this.props.round}
                  rank="one"
                  clickable={this.state.clickable}
                  clickAnswer={this.clickAnswer}
                  Engname="EngAnswerone"
                  Arabname="ArabAnswerone"
                  answerColor={this.state.answerColor}
                  show={this.state.show.one}
                />

                <div style={{ flexGrow: 1 }}></div>
                <AnswerItem
                  n={this.state.n}
                  round={this.props.round}
                  rank="two"
                  clickable={this.state.clickable}
                  clickAnswer={this.clickAnswer}
                  Engname="EngAnswertwo"
                  Arabname="ArabAnswertwo"
                  answerColor={this.state.answerColor}
                  show={this.state.show.two}
                />
              </div>

              <div
                style={{
                  flexGrow: 1,
                  minHeight: 20,
                  maxHeight: 250,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

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
                  fontSize: 20,
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <AnswerItem
                  n={this.state.n}
                  round={this.props.round}
                  rank="three"
                  clickable={this.state.clickable}
                  clickAnswer={this.clickAnswer}
                  Engname="EngAnswerthree"
                  Arabname="ArabAnswerthree"
                  answerColor={this.state.answerColor}
                  show={this.state.show.three}
                />

                <div style={{ flexGrow: 1 }}></div>
                <AnswerItem
                  n={this.state.n}
                  round={this.props.round}
                  rank="four"
                  clickable={this.state.clickable}
                  clickAnswer={this.clickAnswer}
                  Engname="EngAnswerfour"
                  Arabname="ArabAnswerfour"
                  answerColor={this.state.answerColor}
                  show={this.state.show.four}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {this.props.loadinground ? (
              <div style={{ marginTop: 50 }}>
                <Spincrescentcomponenet color="#07617d" size="4x" />
              </div>
            ) : (
              <>
                {this.props.errormessage ? (
                  <Wronganswers
                    Araberror={this.props.errormessage}
                    Engerror={this.props.errormessage}
                  />
                ) : (
                  <>
                    {10 - (this.state.n + 1) + this.state.numbcorrectanswers <
                    this.props.location.state.difficultychosen.minCorrect ? (
                      <Wronganswers
                        Araberror={this.Araberroranswers}
                        Engerror={this.Engerroranswers}
                        onRetry={this.replay}
                      />
                    ) : (
                      <Welldone
                        score={this.state.score}
                        difficultyId={
                          this.props.location.state.difficultychosen.id
                        }
                        allanswers={this.props.allanswers}
                        onRetry={this.replay}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = { loadRound, sousListroundupdated };

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
  allanswers: state.betfundata.round.souslist,
  currentcategory: state.betfundata.currentcategory.data,
  round: state.betfundata.round.list,
  errormessage: state.betfundata.round.errors.message,
  loadinground: state.betfundata.round.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Playround);

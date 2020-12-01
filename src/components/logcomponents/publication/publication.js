import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faEllipsisH,
  faFutbol,
  faCaretRight,
  faUser,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import ShareIcon from "@material-ui/icons/Share";
import Cheer from "../../../commun/logos/cheer";
import SendIcon from "@material-ui/icons/Send";

export default class Publication extends Component {
  render() {
    return (
      <div className="publicationContainer">
        <div>
          <div>
            <div
              // className="navbar"
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "'Lato', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                // border: "1px solid #4e0000 ",
                marginBottom: 200,
                // backgroundColor: "black",
              }}
            >
              <div
                style={{
                  width: 85,
                  height: 85,
                  // border: "1px solid blue",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "-22px 0px 0 0  #070427",
                }}
              >
                <img
                  src="cr7profile.jpg"
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: "50%",
                    userSelect: "none",
                  }}
                />
              </div>

              <div
                style={{
                  height: 50,
                  marginTop: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 5,
                  paddingRight: 5,
                  alignItems: "center",
                  width: "95%",
                  // backgroundColor: "#fdfcfc",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dbcccc",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderBottom: "none",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <div>Cristiano Ronaldo</div>
                  <FontAwesomeIcon
                    color="#656568"
                    icon={faCaretRight}
                    size="1x"
                    style={{ cursor: "pointer", marginLeft: 5 }}
                  />
                  <FontAwesomeIcon
                    color="#656568"
                    icon={faUser}
                    size="1x"
                    style={{ cursor: "pointer", marginLeft: 5 }}
                  />
                  <FontAwesomeIcon
                    color="#656568"
                    icon={faCaretRight}
                    size="1x"
                    style={{ cursor: "pointer", marginLeft: 5 }}
                  />
                  <FontAwesomeIcon
                    color="#656568"
                    icon={faFutbol}
                    size="1x"
                    style={{ cursor: "pointer", marginLeft: 5 }}
                  />
                </div>
                <FontAwesomeIcon
                  color="#656568"
                  icon={faEllipsisH}
                  size="1x"
                  style={{ cursor: "pointer", marginLeft: 5 }}
                />
              </div>

              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d6d6e2",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 0,
                  paddingTop: 10,
                  borderTopRightRadius: 3,
                  borderTopLeftRadius: 3,
                  marginBottom: 0,
                  boxSizing: "border-box",
                }}
              >
                <img
                  src="cr7.jpg"
                  style={{
                    width: "98%",
                    border: "2px solid #d6d6e2",
                    borderTopRightRadius: 3,
                    borderTopLeftRadius: 3,
                    userSelect: "none",
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    paddingRight: 5,
                    paddingLeft: 5,
                    paddingTop: 2,
                    paddingBottom: 2,
                    boxSizing: "border-box",
                    // border: "1px solid green",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: 150,
                        // border: "1px solid blue",
                        justifyContent: "space-between",
                      }}
                    >
                      <Cheer />
                      <motion.div
                        whileHover={{ y: -3 }}
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <InsertCommentIcon
                          whileHover={{ scale: 1.5 }}
                          style={{
                            alignSelf: "flex-end",
                            color: "#4c4c4e",
                            cursor: "pointer",
                          }}
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -3 }}
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <ShareIcon
                          style={{
                            color: "#4c4c4e",
                            cursor: "pointer",
                          }}
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -3 }}
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <SendIcon
                          style={{
                            color: "#4c4c4e",
                            cursor: "pointer",
                          }}
                        />
                      </motion.div>
                    </div>

                    <div
                      style={{
                        alignSelf: "flex-end",
                        color: "#4c4c4e",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      Bet domains
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        fontSize: 10,
                        marginLeft: 4,
                        color: "#4c4c4e",
                        cursor: "pointer",
                      }}
                    >
                      999 Cheers
                    </div>
                    <div
                      style={{
                        color: "#4c4c4e",
                        cursor: "pointer",
                        fontSize: 10,
                        marginLeft: 20,
                      }}
                    >
                      1001 comments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

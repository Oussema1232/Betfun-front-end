import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import Islamiccolumn from "../commun/logos/islamiccolumn2";

export default function Notfound() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          color: "#2e383f",
          width: "100%",
          boxSizing: "border-box",
          maxWidth: 600,
          
        }}
      >
        <div
          style={{
            display: "flex",
            padding: 6,
            color: "#f9a828",
            backgroundColor: "#2e383f",
            marginBottom: 18,
            alignItems: "center",
            border: "2px solid #2e383f",
            borderTop: "0px solid #07617d",
          }}
        >
          <div style={{ fontSize: 85, marginRight: 4 }}>4</div>
          <motion.div
            style={{
              width: 50,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 30,
                  backgroundColor: "grey",
                  border: "1px solid black",
                  borderBottom: "1px solid grey",
                  borderTopLeftRadius: 45,
                  borderTopRightRadius: 45,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  color="white"
                  icon={faStarAndCrescent}
                  size="1x"
                />
              </div>
              <div
                style={{
                  width: 46,
                  height: 20,
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "space-between",
                  backgroundColor: "#f9a828",
                  border: "1px solid black",
                  borderTop: "0px solid #f9a828",
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 10,
                      border: "1px solid black",
                      borderTop: "1px solid grey",
                      borderLeft: "0px solid black",
                      backgroundColor: "grey",
                    }}
                  ></div>
                  <div
                    style={{
                      width: 12,
                      height: 7,
                      border: "1px solid black",
                      backgroundColor: "green",
                      borderBottomRightRadius: "50%",
                      borderBottomLeftRadius: "50%",
                      display: "flex",
                      borderTop: "2px solid black",

                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{ height: 4, width: 3, backgroundColor: "black" }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: 5,
                      height: 12,
                      borderBottomRightRadius: 45,
                      borderBottomLeftRadius: 45,
                      border: "1px solid black",
                      borderTop: "1px solid grey",

                      backgroundColor: "grey",
                    }}
                  ></div>
                  <div
                    style={{
                      width: 12,
                      height: 7,
                      border: "1px solid black",
                      backgroundColor: "green",
                      borderBottomRightRadius: "50%",
                      borderBottomLeftRadius: "50%",
                      display: "flex",
                      borderTop: "2px solid black",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{ height: 4, width: 3, backgroundColor: "black" }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: 8,
                      height: 10,
                      border: "1px solid black",
                      borderTop: "1px solid grey",
                      borderRight: "0px solid black",
                      backgroundColor: "grey",
                    }}
                  ></div>
                </div>

                <motion.div
                  animate={{
                    width: [8, 5, 8],
                    transition: { yoyo: Infinity },
                  }}
                  style={{
                    width: 9,
                    height: 3,
                    marginBottom: 1,
                    borderRadius: 2,
                    backgroundColor: "#cc0000",
                    alignSelf: "center",
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
          <div style={{ fontSize: 85, marginLeft: 4 }}>4</div>
        </div>
        <div
          style={{
            width: "100%",
            fontWeight: "bold",
            fintSize: 20,
            textAlign: "center",
          }}
        >
          We bet that you lost your way. No problem, Betfun sent this army just for
          you to guide you home because you are so precious to us.
        </div>

        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: 15,
            marginBottom: 15,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {arr.map((s) => (
            <Islamiccolumn x={[-1, 1]} y={[0, 1, 0]} dance={false} />
          ))}
        </div>
        <Link to="/game/welcome" style={{ textDecoration: "none" }}>
          <div className="resendlink">Go Home</div>
        </Link>
      </div>
    </div>
  );
}

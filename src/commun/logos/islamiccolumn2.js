import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";

export default function Islamiccolumn(props) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <motion.div
        animate={{
          x: props.x,
          y: props.jump,
          transition: { yoyo: Infinity, duration: props.dance ? 0.8 : 0.8 },
        }}
        style={{
          width: 50,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          animate={{ y: props.y, transition: { yoyo: Infinity } }}
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
            <FontAwesomeIcon color="white" icon={faStarAndCrescent} size="1x" />
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            {props.showmouth && (
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
            )}
          </div>
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 37,
              height: 60,
              display: "flex",
              justifyContent: "space-between",
              overflow: "hidden",
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              backgroundColor: "#07617d",
            }}
          >
            {props.dance && (
              <motion.div
                style={{
                  height: 29,
                  transform: "rotate(-30deg)",
                  width: 15,
                  borderBottomLeftRadius: 5,
                  backgroundColor: "#2e383f",
                }}
              ></motion.div>
            )}
          </div>

          {props.dance && (
            <div
              style={{
                display: "flex",
                width: 37,

                justifyContent: "space-between",
              }}
            >
              <motion.div
                animate={{
                  height: [25, 15, 25],
                  transition: { yoyo: Infinity, duration: 0.8 },
                }}
                style={{
                  width: 16,
                  boxSizing: "border-box",
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                  backgroundColor: "#07617d",
                  border: "1px solid #07617d",
                }}
              ></motion.div>
              <motion.div
                animate={{
                  height: [25, 15, 25],
                  transition: { yoyo: Infinity, delay: 0.8, duration: 0.8 },
                }}
                style={{
                  width: 16,
                  boxSizing: "border-box",
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                  backgroundColor: "#07617d",
                  border: "1px solid #07617d",
                }}
              ></motion.div>
            </div>
          )}
        </div>
      </motion.div>
      {props.dance && (
        <motion.div
          animate={{
            rotate: [0, -5, 0],

            transition: { yoyo: Infinity, duration: 0.8 },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: -37,
            marginTop: 22,
          }}
        >
          <div
            style={{
              width: 55,
              height: 13,
              backgroundColor: "#2e383f",
              borderRadius: 7,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: -5,
              width: 100,
            }}
          >
            <div
              style={{ width: 10, height: 8, backgroundColor: "black" }}
            ></div>
            <div
              style={{
                width: 8,
                borderRadius: 2,
                height: 20,
                backgroundColor: "black",
              }}
            ></div>
            <div
              style={{
                width: 70,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 13,
                backgroundColor: "gold",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}
            >
              <div
                style={{
                  width: "80%",
                  marginLeft: 8,
                  height: 1,
                  backgroundColor: "black",
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

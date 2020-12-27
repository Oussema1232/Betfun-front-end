import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Usermoonavatar from "./usermoonavatar";

export default function KingComponent({ kings, countryId }) {
  return (
    <div className="kingItemsContainer">
      {kings.map((k) => (
        <AnimatePresence exitBeforeEnter>
          {((countryId != "All" && countryId == k.countryId) ||
            countryId == "All") && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{ type: "spring", stiffness: 150 }}
              exit={{
                y: -20,
                opacity: 0,
                transition: { ease: "easeInOut", duration: 0.3, delay: 0.3 },
              }}
              className="kingItem"
              style={{
                width: "100%",
                display:
                  countryId == "All" || countryId == k.countryId
                    ? "flex"
                    : "none",
                alignItems: "center",
                minHeight: 50,

                justifyContent: "space-between",
                borderBottom: "2px solid #ede5e5",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "25%",
                  borderRight: "1px solid #eeeeee",
                  padding: 6,
                  minHeight: 40,
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <img src="" style={{ width: 35, marginRight: 5 }} />
                </div>
                <div>{k.countryname}</div>
              </div>
              <div className="kinuserphotocontainer">
                <div className="kingphotocontainer">
                  <Usermoonavatar
                    src="../../../../../cr7profile.jpg"
                    alt="cr7"
                    dimentionimage={40}
                    dimentionmoon={50}
                    boxshadowcolor="#3abe61"
                  />
                </div>
                <div>
                  {k.sex == "Female"
                    ? `Queen ${k.username}`
                    : `King ${k.username} mala bibi jika mala kaka`}
                </div>
              </div>
              <div
                style={{
                  width: "15%",
                  borderRight: "1px solid #eeeeee",
                  borderLeft: "1px solid #eeeeee",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 6,
                  minHeight: 40,
                  boxSizing: "border-box",
                }}
              >
                {k.total_points} pts
              </div>
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 6,
                  minHeight: 40,
                  boxSizing: "border-box",
                }}
              >
                {`${k.NTKing} Time(s) King`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

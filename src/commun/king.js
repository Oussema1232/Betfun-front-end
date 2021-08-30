import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { savecurrentProfile } from "../features/currentprofile/currentprofileSlice";
import Usermoonavatar from "./usermoonavatar";

export default function KingComponent({ kings, countryId }) {
  const dispatch = useDispatch();
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );

  return (
    <div className="kingItemsContainer" style={{ color: "#171717" }}>
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
                borderBottom: "2px solid #f9a828",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "25%",

                  padding: 6,
                  minHeight: 40,
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <img src={k.countrylogo} style={{ width: 35 }} />
                </div>
                <div style={{ textAlign: "center", fontSize: 10 }}>
                  {k.countryname}
                </div>
              </div>
              <div
                className="kinuserphotocontainer"
                onClick={() => {
                  dispatch(
                    savecurrentProfile({
                      id: k.id,
                      username: k.username,
                    })
                  );
                }}
              >
                <Link
                  to={`/betfun/game/bets/${currentdomain.name}/${currentdomain.id}`}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "#171717",
                    textAlign: "center",
                  }}
                >
                  {k.gender == "Female"
                    ? `Queen ${k.username}`
                    : `King ${k.username}`}
                </Link>
              </div>

              <div
                style={{
                  width: "15%",
                  borderRight: "1px solid black",
                  borderLeft: "1px solid black",
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
                {`${k.NTKing} Time(s)${
                  k.gender == "Male" ? " King" : " Queen"
                }`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

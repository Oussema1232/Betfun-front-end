import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import onClickOutside from "react-onclickoutside";
import { loadSeasons } from "../features/seasons/seasonSlice";

class Seasonspopup extends Component {
  state = { visibility: false };

  handleClickOutside = () => {
    this.setState({ visibility: false });
  };

  render() {
    return (
      <span>
        <div
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          {this.props.children}
        </div>
        <AnimatePresence>
          {this.state.visibility && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 15, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              exit={{ y: -5, opacity: 0 }}
              style={{
                maxWidth: 250,
                width: 100,
                backgroundColor: "#ffcb05",
                overflow: "auto",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                position: "absolute",
                zIndex: 998,
                display: "flex",
                flexDirection: "column",
                color: "black",
                alignItems: "center",
              }}
            >
              {this.props.seasons.map((s) => (
                <Link
                  to={`/yourgame/calendar/${this.props.currentdomain.name}/${s.name}/${this.props.currentdomain.id}/${s.id}`}
                >
                  <div style={{ fontSize: 15, fontWeight: "bold", padding: 5 }}>
                    {s.name}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  currentdomain: state.betfundata.currentdomain.data,
});

export default connect(mapStateToProps, null)(onClickOutside(Seasonspopup));

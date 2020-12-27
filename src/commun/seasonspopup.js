import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import onClickOutside from "react-onclickoutside";


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
                backgroundColor: this.props.color,
                overflow: "auto",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                position: "absolute",
                zIndex: 998,
                display: "flex",
                flexDirection: "column",
                color: "black",
                alignItems: "center",
                marginLeft: -20,
              }}
            >
              {this.props.seasons.map((s) => (
                <>
                  {this.props.link ? (
                    <Link
                      to={`/game/${this.props.thepathname}/${this.props.currentdomain.name}/${s.name}/${this.props.currentdomain.id}/${s.id}`}
                    >
                      <div
                        style={{ fontSize: 15, fontWeight: "bold", padding: 5 }}
                      >
                        {s.name}
                      </div>
                    </Link>
                  ) : (
                    <div
                      style={{ fontSize: 15, fontWeight: "bold", padding: 5 }}
                    >
                      {s.name}
                    </div>
                  )}
                </>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import background from "../../src/sky.jpg";
import Betfunalllogo from "../commun/logos/betfunalllogo";

import "./style.css";
import Navbar from "../components/navbar/navbar";
import BetdomainNavbar from "../components/navbar/betdomainNavbar";
import Publication from "../components/logcomponents/publication/publication";
class Mainscreen extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",

          backgroundColor: "#ede5e5",
          // backgroundColor: "#f4f4f7",
          // backgroundImage: `url(${background})`,
        }}
      >
        <Navbar />
        <BetdomainNavbar />
        <Publication />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
  countries: state.betfundata.countries.list,
  users: state.betfundata.users.list,
});

export default connect(mapStateToProps, null)(Mainscreen);

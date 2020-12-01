import React, { Component } from "react";
import MyDrawer from "../../commun/drawer";

export default class DrawerBetfunDomains extends Component {
  more = [
    {
      name: "Tunisian League",
    },
    {
      name: "Premier League",
    },
    {
      name: "UFC",
    },
  ];
  render() {
    return (
      <MyDrawer
        handleDrawerClose={this.props.handleDrawerClose}
        open={this.props.open}
        title={{ name: "Betfun Domains" }}
        content={this.more}
      />
    );
  }
}

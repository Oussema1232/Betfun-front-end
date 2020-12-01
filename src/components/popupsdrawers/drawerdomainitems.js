import React, { Component } from "react";
import MyDrawer from "../../commun/drawer";

export default class DrawerDomainItems extends Component {
  more = [
    {
      name: "Leagues",
    },
    {
      name: "Bet",
    },
    {
      name: "Fixtures",
    },
    {
      name: "Calendar",
    },
    {
      name: "Titles",
    },
  ];
  render() {
    return (
      <MyDrawer
        handleDrawerClose={this.props.handleDrawerClose}
        open={this.props.open}
        title={{ name: "Betfun" }}
        content={this.more}
      />
    );
  }
}

import React, { Component } from "react";
import MyDrawer from "../../commun/drawer";

export default class DrawerCommunities extends Component {
  more = [
    {
      name: "Football",
    },
    {
      name: "Handball",
    },
    {
      name: "Basketball",
    },
    {
      name: "Volleyball",
    },

    {
      name: "Tennis",
    },
    {
      name: "American football",
    },
    {
      name: "Rugby",
    },
    {
      name: "Combat Sports",
    },
    {
      name: "Water sports",
    },
    {
      name: "Winter sports",
    },
    {
      name: "Hockey",
    },
    {
      name: "Dodge-ball",
    },
    {
      name: "Cricket",
    },
    {
      name: "Badminton",
    },
    {
      name: "Auto racing",
    },
    {
      name: "Outdoor adventure activities",
    },

    {
      name: "Other",
    },
  ];
  render() {
    return (
      <MyDrawer
        handleDrawerClose={this.props.handleDrawerClose}
        open={this.props.open}
        title={{ name: "Communities" }}
        content={this.more}
      />
    );
  }
}

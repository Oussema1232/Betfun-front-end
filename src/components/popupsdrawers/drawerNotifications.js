import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";

import MyDrawer from "../../commun/drawer";

export default class DrawerNotifications extends Component {
  more = [
    {
      id: 0,
      name: "Settings",
      pathname: "/game/params",
      icon: (
        <FontAwesomeIcon
          color="#f9a828"
          icon={faCog}
          size="lg"
          style={{ cursor: "pointer" }}
        />
      ),
    },

    {
      id: 1,
      name: "Log out",
      pathname: "/logout",
      icon: (
        <FontAwesomeIcon
          color="#f9a828"
          icon={faSignOutAlt}
          size="lg"
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  render() {
    return (
      <MyDrawer
        toggleDrawer={this.props.toggleDrawer}
        open={this.props.open}
        anchor={this.props.anchor}
        title={{ name: "Account" }}
        content={this.more}
      />
    );
  }
}

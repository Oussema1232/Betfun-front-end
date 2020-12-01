import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DrawerDomainItems from "../popupsdrawers/drawerdomainitems";

import "./style.css";

export default class BetdomainNavbar extends Component {
  state = { opendrawerdomainitems: false };

  openDrawerDomainItems = () => {
    this.setState({ opendrawerdomainitems: true });
  };
  closeDrawerDomainItems = () => {
    this.setState({ opendrawerdomainitems: false });
  };

  render() {
    return (
      <>
        <div className="betdomainNavbar">
          <div className="desktopDomainLogoNameContainer ">
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <img
                src="ftf.png"
                alt="ftf"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="domainNameDesktop">Premier League</div>
          </div>
          <div className="betdomainNavbarItemsContainerDesktop">
            <div className="betdomainNavbarItem">Leagues</div>
            <div className="betdomainNavbarItem">Bet</div>
            <div className="betdomainNavbarItem">Fixtures</div>
            <div className="betdomainNavbarItem">Calendar</div>
            <div className="betdomainNavbarItem">Titles</div>
          </div>
          <div className="domainNamePhone">Tunisian Fedaration of football</div>
          <div className="fabarContainer">
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              color="#eeeeee"
              style={{ cursor: "pointer" }}
              onClick={this.openDrawerDomainItems}
            />
          </div>
        </div>
        <DrawerDomainItems
          open={this.state.opendrawerdomainitems}
          handleDrawerClose={this.closeDrawerDomainItems}
        />
      </>
    );
  }
}

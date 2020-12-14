import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DrawerDomainItems from "../popupsdrawers/drawerdomainitems";
import Seasonspopup from "../../commun/seasonspopup";
import { loadSeasons } from "../../features/seasons/seasonSlice";

import "./style.css";

class BetdomainNavbar extends Component {
  state = { opendrawerdomainitems: false, seasonsvisibility: false };

  componentDidMount() {
    this.props.loadSeasons(`/${this.props.currentdomain.id}`);
  }

  openDrawerDomainItems = () => {
    this.setState({ opendrawerdomainitems: true });
  };
  closeDrawerDomainItems = () => {
    this.setState({ opendrawerdomainitems: false });
  };

  bouncevisibility = () => {
    this.setState({ seasonsvisiblity: !this.state.seasonsvisibility });
  };

  render() {
    return (
      <div>
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
                src="../../../ftf.png"
                alt="ftf"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="domainNameDesktop">
              {this.props.currentdomain.name}
            </div>
          </div>
          <div className="betdomainNavbarItemsContainerDesktop">
            <Link
              to={`/yourgame/yourleagues/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
              className="betdomainNavbarItem"
            >
              <div className="betdomainNavbarItem">Leagues</div>
            </Link>
            <Link
              to={`/yourgame/yourbets/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
              className="betdomainNavbarItem"
            >
              <div>Bet</div>
            </Link>
            <div className="betdomainNavbarItem">Fixtures</div>
            {/* <Link
              to={`/yourgame/calendar/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
              className="betdomainNavbarItem"
            > */}
            <div>
              <Seasonspopup seasons={this.props.seasons}>
                <div
                  className="betdomainNavbarItem"
                  onClick={this.bouncevisibility}
                >
                  Calendar
                </div>
              </Seasonspopup>
            </div>

            {/* </Link> */}
            <div className="betdomainNavbarItem">Titles</div>
          </div>
          <div className="domainNamePhone">{this.props.currentdomain.name}</div>
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
          seasons={this.props.seasons}
        />
      </div>
    );
  }
}

const mapDispatchToProps = { loadSeasons };

const mapStateToProps = (state) => ({
  currentdomain: state.betfundata.currentdomain.data,
  seasons: state.betfundata.seasons.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(BetdomainNavbar);

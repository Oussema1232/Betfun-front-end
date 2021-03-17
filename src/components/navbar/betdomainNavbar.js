import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DrawerDomainItems from "../popupsdrawers/drawerdomainitems";
import Seasonspopup from "../../commun/seasonspopup";
import { loadSeasons } from "../../features/seasons/seasonSlice";
import { seasonsFinished } from "../../features/seasons/seasonSlice";

import "./style.css";

class BetdomainNavbar extends Component {
  state = {
    opendrawerdomainitems: false,
  };

  componentDidMount() {
    this.props.loadSeasons(`/${this.props.currentdomain.id}`);
  }

  openDrawerDomainItems = () => {
    this.setState({ opendrawerdomainitems: true });
  };
  closeDrawerDomainItems = () => {
    this.setState({ opendrawerdomainitems: false });
  };

  render() {
    return (
      <div>
        <div className="betdomainNavbar">
          <div className="desktopDomainLogoNameContainer ">
            {this.props.currentdomain.logo ? (
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
                  src={this.props.currentdomain.logo}
                  alt={this.props.currentdomain.name}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                  }}
                />
              </div>
            ) : (
              <Skeleton
                animation="pulse"
                variant="circle"
                height={50}
                width={50}
              />
            )}
            <div className="domainNameDesktop">
              {this.props.currentdomain.name ? (
                <div>{this.props.currentdomain.name}</div>
              ) : (
                <Skeleton
                  animation="pulse"
                  variant="text"
                  height={24}
                  width={90}
                />
              )}
            </div>
          </div>
          <div className="betdomainNavbarItemsContainerDesktop">
            <Link
              to={`/betfun/game/bets/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
              className="betdomainNavbarItem"
            >
              <div>Bets</div>
            </Link>
            <Link
              to={`/betfun/game/leagues/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
              className="betdomainNavbarItem"
            >
              <div className="betdomainNavbarItem">Leagues</div>
            </Link>
            {this.props.latestseason && (
              <Link
                to={`/betfun/game/fixtures/${this.props.currentdomain.name}/${this.props.latestseason.name}/${this.props.currentdomain.id}/${this.props.latestseason.id}`}
                className="betdomainNavbarItem"
              >
                <div className="betdomainNavbarItem">Fixtures</div>
              </Link>
            )}
            <div>
              <Seasonspopup
                seasons={
                  !this.props.seasonsError
                    ? this.props.seasons
                    : [{ name: this.props.seasonsError }]
                }
                thepathname="calendar"
                backgroundColor={
                  !this.props.seasonsError ? "#ffcb05" : "#f9a828"
                }
                color="#02010f"
                link={!this.props.seasonsError ? true : false}
              >
                <div className="betdomainNavbarItem">Calendar</div>
              </Seasonspopup>
            </div>
            <Link
              to={`/betfun/game/levels/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
              className="betdomainNavbarItem"
            >
              <div>Levels</div>
            </Link>
            {this.props.currentprofile.id !== this.props.currentuser.id && (
              <Link
                to={`/betfun/game/stats/${this.props.currentdomain.name}/${this.props.currentdomain.id}/${this.props.currentprofile.username}/${this.props.currentprofile.id}`}
                className="betdomainNavbarItem"
              >
                <div>Stats</div>
              </Link>
            )}
            {true && (
              <Link
                to={`/betfun/game/teams/${this.props.currentdomain.name}/${this.props.currentdomain.id}`}
                className="betdomainNavbarItem"
              >
                <div>Teams</div>
              </Link>
            )}
            <div>
              <Seasonspopup
                link={
                  !this.props.seasonsError
                    ? this.props.finishedseasons.length >= 1
                      ? true
                      : false
                    : false
                }
                backgroundColor={
                  !this.props.seasonsError
                    ? this.props.finishedseasons.length >= 1
                      ? "#ffcb05"
                      : "#fbf9f9"
                    : "#d10d2f"
                }
                color="#02010f"
                seasons={
                  !this.props.seasonsError
                    ? this.props.finishedseasons.length >= 1
                      ? this.props.finishedseasons
                      : [{ name: "Ongoing seasons, no titles yet" }]
                    : [{ name: this.props.seasonsError }]
                }
                thepathname="titles"
              >
                <div className="betdomainNavbarItem">Titles</div>
              </Seasonspopup>
            </div>
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
          theLatestseason={this.props.latestseason}
          theFinishedseasons={this.props.finishedseasons}
          theseasonsError={this.props.seasonsError}
        />
      </div>
    );
  }
}

const mapDispatchToProps = { loadSeasons };

const mapStateToProps = (state) => ({
  currentdomain: state.betfundata.currentdomain.data,
  currentprofile: state.betfundata.currentprofile.data,
  currentuser: state.betfundata.currentuser.data,
  seasons: state.betfundata.seasons.list,
  seasonsError: state.betfundata.seasons.errors.message,
  finishedseasons: seasonsFinished(state),
  latestseason: state.betfundata.seasons.latestseason,
});

export default connect(mapStateToProps, mapDispatchToProps)(BetdomainNavbar);

import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { savecurrentDomain } from "../../features/currentdomain/currentdomainSlice";

import SearchIcon from "@material-ui/icons/Search";
import Blogo from "../../commun/logos/blogo";
import Tagline from "../../commun/logos/tagline";
import SearchInput from "../../commun/searchinput";
import SimpleBadge from "../../commun/badge";

import Badge from "@material-ui/core/Badge";
import ViewListIcon from "@material-ui/icons/ViewList";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import MyDrawerNotification from "../popupsdrawers/drawerNotifications";
import MyDrawerCommunities from "../popupsdrawers/drawerCommunities";
// import MyDrawerDomains from "../popupsdrawers/drawerBetfunDomains";
import MyDrawerDomains from "../popupsdrawers/drawerBetfunGames";
import "./style.css";

class Navbar extends Component {
  state = {
    opendrawernotifications: false,
    opendrawercommunities: false,
    opendrawerDomains: false,
  };

  openDrawerNotifications = () => {
    this.setState({
      opendrawercommunities: false,
      opendrawernotifications: true,
      opendrawerDomains: false,
    });
  };

  openDrawerCommunities = () => {
    this.setState({
      opendrawercommunities: true,
      opendrawernotifications: false,
      opendrawerDomains: false,
    });
  };

  openDrawerDomains = () => {
    this.setState({
      opendrawercommunities: false,
      opendrawernotifications: false,
      opendrawerDomains: true,
    });
  };

  closeDrawerNotifications = () => {
    this.setState({ opendrawernotifications: false });
  };
  closeDrawerCommunities = () => {
    this.setState({ opendrawercommunities: false });
  };
  closeDrawerDomains = () => {
    this.setState({ opendrawerDomains: false });
  };

  render() {
    return (
      <>
        <div className="navbarbetfun">
          <div className="logosearchContainer">
            <div className="blogosearchContainer">
              <Link to="/betfun/welcome">
                <div className="blogo">
                  <Blogo />
                </div>
              </Link>
              {/* <Tagline
                style={{ fontSize: 20, alignSelf: "flex-end", marginBottom: 3 }}
              /> */}
            </div>
          </div>
          <div style={{ flexGrow: 1 }}></div>

          <div className="desktopscreenbetpub">
            <div
              onClick={this.openDrawerDomains}
              style={{
                paddingRight: 3,
                paddingLeft: 3,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  marginRight: 30,
                }}
                className="iconContainer"
              >
                <FontAwesomeIcon
                  icon={faThList}
                  size="1x"
                  color="#f9a828"
                  style={{ cursor: "pointer", fontSize: 23 }}
                />

                <div>Domains</div>
              </div>
            </div>

            <div
              onClick={this.openDrawerNotifications}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="iconContainer"
            >
              <img
                style={{ cursor: "pointer" }}
                className="user"
                src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTM5My4xNDggMzY5LjA3MmMtMy45NjgtMi4wODYtOC4xNDUtMy43NjMtMTIuNDQ1LTUuMDI2IDM5LjE5LTQ4LjI2NiA1OS4wMzctOTEuMTY2IDU5LjAzNy0xMjcuNzc2IDAtMzkuNjAzLTExLjIzNS03Ny42OTQtMzIuNDkyLTExMC4xNTUtMTguMjM4LTI3Ljg1MS00Mi43MDEtNDkuOTM5LTcxLjI5NC02NC41MWw2LjMyNi0xOS42ODFjMS44MS01LjYzLjE0My0xMS43OTgtNC4yNTgtMTUuNzUtNC40LTMuOTUzLTEwLjcxMi00Ljk0OS0xNi4xMTQtMi41NDdsLTM1LjQwMiAxNS43MzQtMTcuMzYtMzEuNTg2Yy0yLjYzNi00Ljc5Ni03LjY3NC03Ljc3NS0xMy4xNDYtNy43NzVzLTEwLjUxIDIuOTc5LTEzLjE0NiA3Ljc3NWwtMTcuMzYgMzEuNTg2LTM1LjQwMi0xNS43MzRjLTUuNDAzLTIuNDAyLTExLjcxNS0xLjQwNC0xNi4xMTQgMi41NDctNC40IDMuOTUyLTYuMDY3IDEwLjEyLTQuMjU4IDE1Ljc1bDYuMzI2IDE5LjY4MWMtMjguNTkzIDE0LjU3MS01My4wNTYgMzYuNjU5LTcxLjI5NCA2NC41MS0yMS4yNTcgMzIuNDYxLTMyLjQ5MiA3MC41NTItMzIuNDkyIDExMC4xNTUgMCAzNi42MDkgMTkuODQ2IDc5LjUwOSA1OS4wMzYgMTI3Ljc3NS00LjI5NCAxLjI2MS04LjQ2MyAyLjkzNS0xMi40MTkgNS4wMTQtMjMuMzYzIDEyLjIyMi0zNy44NzcgMzYuNDg5LTM3Ljg3NyA2My4zMzF2NjQuNjFjMCA4LjI4NCA2LjcxNiAxNSAxNSAxNWgzMjBjOC4yODQgMCAxNS02LjcxNiAxNS0xNXYtNjQuNjFjMC0yNi44NDItMTQuNTE0LTUxLjEwOS0zNy44NTItNjMuMzE4em0tNzQuODY4LTI1Mi40ODIgOC4zNDktMjUuOTczYzUwLjk2OSAyNy45NTcgODMuMTExIDgzLjQxIDgzLjExMSAxNDUuNjUzIDAgMzIuOS0yMi43OTIgNzYuMDMtNjUuOTg5IDEyNC45OWgtMjEuODQxdi00MC44OTZjMTEuODk2LTkuMTc1IDIyLjAwMS0yMC43NzggMjkuNTc5LTM0LjA4OCA5Ljg4NS0xNy4zNjEgMTUuMjQxLTM3LjI1OCAxNS40OTItNTcuNTRoLS4wMDNjLjAxMi0xLjQxNy4wMjEtOC40NzEuMDIxLTUwLjEzNSAwLTguMjg0LTYuNzE2LTE1LTE1LTE1LTQyLjk1MSAwLTYzLjgyLTIwLjY1Mi03My41MzUtMzYuNmgyNS41MzZjNi41MTYtLjAwMSAxMi4yODYtNC4yMDggMTQuMjgtMTAuNDExem0tNjcuODQ1IDM4LjI0N2MyLjA0NS0yLjQ4MyAzLjg5NS00Ljk2MSA1LjU2NS03LjQgMS42NzEgMi40MzkgMy41MiA0LjkxNyA1LjU2NCA3LjQgMTIuOTg3IDE1Ljc2NyAzNi4yNjcgMzQuMjMzIDc1LjQzNSAzOC4wNTEtLjAwMSAxNi42NC0uMDA2IDM0LjAzOS0uMDE1IDM1LjQzOCAwIC4wMTMtLjAwMS4wMjUtLjAwMS4wMzgtLjM3MyAzMC4xODUtMTUuOTk0IDU4LjI4LTQwLjc3MiA3My4zMjUtMTIuMTc5IDcuNC0yNi4wODMgMTEuMzExLTQwLjIxMSAxMS4zMTFzLTI4LjAzMi0zLjkxMS00MC4yMTUtMTEuMzEzYy0yNC43NzQtMTUuMDQzLTQwLjM5Ni00My4xMzktNDAuNzctNzMuMzIzIDAtLjAwOSAwLS4wMTgtLjAwMS0uMDI2LS4wMDgtMS4zNTctLjAxMy0xOC43ODItLjAxNC0zNS40NSAzOS4xNjktMy44MTggNjIuNDQ4LTIyLjI4NCA3NS40MzUtMzguMDUxem0tMzAuMzQ1IDE4MS45NWMxMS41MDEgNC4wOTQgMjMuNjQxIDYuMjEzIDM1LjkxIDYuMjEzIDEyLjI3IDAgMjQuNDEtMi4xMTkgMzUuOTEtNi4yMTN2MzMuNjU1bC0zNS45MSAzOS4zMTYtMzUuOTEtMzkuMzE2em01LjgxOC0yNjQuNDEzYzcuMTI0IDMuMTY4IDE1LjQ4My4zNDkgMTkuMjM3LTYuNDgybDEwLjg1NS0xOS43NDkgMTAuODU0IDE5Ljc1YzMuNzU1IDYuODMxIDEyLjExOCA5LjY0OCAxOS4yMzcgNi40ODJsMTcuMzcxLTcuNzItMTAuMzk3IDMyLjM0NWgtNzQuMTMxbC0xMC4zOTctMzIuMzQ2em0tNDAuNTM3IDE4LjI0MyA4LjM0OSAyNS45NzNjMS45OTQgNi4yMDMgNy43NjUgMTAuNDEgMTQuMjggMTAuNDFoMjUuNDkzYy0xLjcxMSAyLjgxOS0zLjc2MiA1Ljc4Ny02LjIxMyA4Ljc2My0xNS4yMTYgMTguNDcxLTM3Ljg1MSAyNy44MzctNjcuMjggMjcuODM3LTguMjg0IDAtMTUgNi43MTYtMTUgMTUgMCA0MS45MzguMDA5IDQ4Ljc5My4wMjEgNTAuMTM1aC0uMDAzYy4yNTEgMjAuMjgxIDUuNjA4IDQwLjE3OCAxNS40OTMgNTcuNTQgNy41NzkgMTMuMzExIDE3LjY4NCAyNC45MTUgMjkuNTc5IDM0LjA4OXY0MC44OTZoLTIxLjg0MWMtNDMuMTk3LTQ4Ljk1OS02NS45ODktOTIuMDktNjUuOTg5LTEyNC45OSAwLTYyLjI0MyAzMi4xNDItMTE3LjY5NiA4My4xMTEtMTQ1LjY1M3ptLTc0LjM3MSAzOTEuMzgzdi0yN2gzM2M4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNWgtMzIuMzQ0YzIuMTgyLTEyLjU4NiA5Ljg1NC0yMy40NjEgMjEuMTUzLTI5LjM3MiA1LjUxNS0yLjg5OCAxMS40ODMtNC4zNjggMTcuNzQxLTQuMzY4aDQ3LjkyNmw0Ni40NDkgNTAuODU2YzIuODQyIDMuMTEyIDYuODYxIDQuODg0IDExLjA3NSA0Ljg4NHM4LjIzMy0xLjc3MiAxMS4wNzUtNC44ODRsNDYuNDQ5LTUwLjg1Nmg0Ny45MjZjNi4yNTggMCAxMi4yMjcgMS40NyAxNy43NjcgNC4zODEgMTEuMjc3IDUuODk5IDE4Ljk0NiAxNi43NzMgMjEuMTI3IDI5LjM1OWgtMzIuMzQ0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDMzdjI3eiIvPjwvZz48L3N2Zz4="
              />
              <div>Bettor</div>
            </div>
          </div>
        </div>
        <MyDrawerNotification
          // onclickItem={this.props.savecurrentDomain}
          open={this.state.opendrawernotifications}
          handleDrawerClose={this.closeDrawerNotifications}
        />

        <MyDrawerDomains
          open={this.state.opendrawerDomains}
          handleDrawerClose={this.closeDrawerDomains}
        />
      </>
    );
  }
}

const mapDispatchToProps = { savecurrentDomain };

const mapStateToProps = (state) => ({
  currentdomain: state.betfundata.currentdomain.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

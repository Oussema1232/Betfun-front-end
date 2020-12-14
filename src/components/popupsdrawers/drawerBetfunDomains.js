import React, { Component } from "react";
import { connect } from "react-redux";
import { savecurrentDomain } from "../../features/currentdomain/currentdomainSlice";
import { loadUserdomains } from "../../features/userdomains/userdomainSlice";
import MyDrawer from "../../commun/drawer";

class DrawerBetfunDomains extends Component {
  componentDidMount() {
    this.props.loadUserdomains(`/${10}`);
  }

  render() {
    return (
      <MyDrawer
        handleDrawerClose={this.props.handleDrawerClose}
        onclickItem={savecurrentDomain}
        open={this.props.open}
        title={{ name: "Betfun Domains" }}
        content={this.props.userdomains}
      />
    );
  }
}

const mapDispatchToProps = { loadUserdomains };

const mapStateToProps = (state) => ({
  userdomains: state.betfundata.userdomains.list,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerBetfunDomains);

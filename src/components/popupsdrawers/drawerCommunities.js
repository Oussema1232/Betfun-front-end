import React, { Component } from "react";
import { connect } from "react-redux";
import { savecurrentCommunity } from "../../features/currentcommunity/currentcommunitySlice";
import { loadCommunities } from "../../features/communities/communitySlice";
import MyDrawer from "../../commun/drawer";

class DrawerCommunities extends Component {
  componentDidMount() {
    this.props.loadCommunities();
  }

  render() {
    return (
      <MyDrawer
        handleDrawerClose={this.props.handleDrawerClose}
        onclickItem={savecurrentCommunity}
        open={this.props.open}
        title={{ name: "Communities" }}
        content={this.props.communities}
      />
    );
  }
}

const mapDispatchToProps = { loadCommunities };

const mapStateToProps = (state) => ({
  communities: state.betfundata.communities.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerCommunities);

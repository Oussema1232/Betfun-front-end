import React, { Component } from "react";
import { connect } from "react-redux";

class Mainscreen extends Component {
  render() {
    return (
      <div>
        <div>Hello betfun users</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
  countries: state.betfundata.countries.list,
  users: state.betfundata.users.list,
});

export default connect(mapStateToProps, null)(Mainscreen);

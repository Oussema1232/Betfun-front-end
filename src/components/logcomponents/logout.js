import { Component } from "react";
import { connect } from "react-redux";
import auth from "../../services/authService";
import { logcurrentUserout } from "../../features/currentuser/currentuserSlice";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    this.props.logcurrentUserout();
    window.location = "/";
  }
  render() {
    return null;
  }
}
const mapDispatchToProps = { logcurrentUserout };

export default connect(null, mapDispatchToProps)(Logout);

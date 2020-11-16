import React, { Component } from "react";

import http from "../../services/httpService";
import { connect } from "react-redux";

class Confirmation extends Component {
  state = { message: "", showmessage: false };

  componentDidMount() {
    this.sendrequest();
  }

  sendrequest = async () => {
    const token = this.props.location.pathname.slice(
      this.props.location.pathname.lastIndexOf("/") + 1
    );

    const pathname = this.props.location.pathname.slice(
      1,
      this.props.location.pathname.lastIndexOf("/")
    );
    this.setState({ message: "", showmessage: false });
    try {
      const response = await http.post(
        `http://localhost:3001/api/confirmation/${token}`,pathname
      );
      this.setState({ message: response.data.message, showmessage: true });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          showmessage: true,
        });
      }
    }
  };
  render() {
    return <div>{this.state.showmessage && <h2>{this.state.message}</h2>}</div>;
  }
}

export default connect()(Confirmation);

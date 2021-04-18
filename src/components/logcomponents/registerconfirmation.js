import React, { Component } from "react";
import { savecurrentUser } from "../../features/currentuser/currentuserSlice";
import http from "../../services/httpService";
import { connect } from "react-redux";


class Confirmation extends Component {
  state = { message: "", showmessage: false, showerror: false };

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
    this.setState({ message: "", showmessage: false, showerror: false });
    try {
      const response = await http.post(
        `http://localhost:3001/api/confirmation/${token}`,
        { data: pathname }
      );

      this.setState({
        message: response.data.message,
        showmessage: true,
        showerror: false,
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          message: err.response.data.message,
          showerror: true,
          showmessage: false,
        });
      }
    }
  };
  render() {
    return (
      <div
        style={{
          backgroundColor: "#ececeb",
          width: "100%",

          minHeight: "100vh",
          height: "100%",
          paddingBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            minWidth: 300,

            backgroundColor: "#fbfbfb",
            marginTop: 70,
            padding: 10,
            borderRadius: 3,
            boxShadow: "0px 0px 3px 4px #d4d4d3",
          }}
        >
          {(this.state.showmessage || this.state.showerror) && (
            <>
              <h2 style={{ marginLeft: 20 }}>{this.state.message}</h2>
              {this.state.showmessage && (
                <h3>Now go back to login page and start betting..</h3>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = { savecurrentUser };

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
});
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);

//when this component is called it sends a request to api/confirmation/token with token is the email token in the link that was sent to the user
//and the path
//this endpoint is confirmmail it verifies the path and the emailtoken if the path is the path of this component and token is valid
//it updates confirm to be true

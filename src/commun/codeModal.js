import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import http from "../services/httpService";
import _ from "lodash";
import Spincrescentcomponenet from "./logos/spincrescentcomponent";
import Form from "./form";
import CodeModal from "./modal";

class CreateLeague extends React.Component {
  state = {
    loading: false,

    message: "",
    code: "",
    showmessage: false,
  };

  onclosemodal = () => {
    this.setState({
      loading: false,

      message: "",
      code: "",
      showmessage: false,
    });
  };

  ongetCode = async () => {
    this.setState({
      message: "",
      showmessage: false,

      loading: true,
    });

    try {
      const response = await http.get(
        `http://localhost:3001/api/leagues/${this.props.leagueId}`
      );
      this.setState({
        code: response.data.data,
        showmessage: false,
        loading: false,
      });
    } catch (err) {
      this.setState({ loading: false });
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 403)
      ) {
        this.setState({
          message: err.response.data.message,
          showmessage: true,
        });
      }
    }
  };

  render() {
    return (
      <CodeModal
        buttonname="Get Code"
        onclosemodal={this.onclosemodal}
        onclickButton={this.ongetCode}
      >
        <div
          style={{
            backgroundColor: "#e9eac9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#02010f",
          }}
        >
          {this.state.loading   ? (
            <Spincrescentcomponenet size="3x" color="#070427" />
          ) : (
            <div
              style={{
                width: "96%",

                marginTop: 0,

                padding: 5,
                borderRadius: 3,

                fontWeight: "bold",

                boxSizing: "border-box",
              }}
            >
              {this.state.message ? (
                <h4>{this.state.message}</h4>
              ) : (
                <div
                  style={{
                    padding: 10,
                    borderRadius: 3,
                    boxShadow: "0px 0px 3px 4px #dddfad",
                  }}
                >
                  <h3
                    style={{
                      color: "green",
                    }}
                  >
                    {this.state.code}
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      </CodeModal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentdomain: state.betfundata.currentdomain.data,
});

export default connect(mapStateToProps, null)(CreateLeague);

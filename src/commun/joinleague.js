import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import http from "../services/httpService";
import Spincrescentcomponenet from "./logos/spincrescentcomponent";
import Form from "./form";
import LeagueModal from "./modal";

export default class JoinLeague extends Form {
  state = {
    data: { code: "" },
    loading: false,
    errors: {},
    message: "",
    showmessage: false,
    showsuccess: false,
  };

  schema = {
    code: Joi.string().required().label("Code"),
  };

  onclosemodal = () => {
    this.setState({
      data: { code: "" },
      message: "",
      showmessage: false,
      showsuccess: false,
      loading: false,
    });
  };

  dosubmit = async () => {
    this.setState({
      message: "",
      showmessage: false,
      showsuccess: false,
      loading: true,
    });

    try {
      const response = await http.post(
        `http://localhost:3001/api/leagues/join`,
        {
          code: this.state.data.code,
          userId: this.props.userId,
        }
      );
      this.setState({
        message: response.data.message,
        showmessage: false,
        showsuccess: true,
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
          showsuccess: false,
        });
      }
    }
  };

  render() {
    return (
      <LeagueModal buttonname="Join" onclosemodal={this.onclosemodal}>
        <div
          style={{
            backgroundColor: "#fbfbfb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {this.state.showmessage && (
            <div
              style={{
                width: "96%",
                fontSize: 13,
                color: "#171717",
                marginTop: 0,

                padding: 5,
                borderRadius: 3,

                fontWeight: "bold",

                boxSizing: "border-box",
              }}
            >
              {this.state.message}
            </div>
          )}
          <div
            style={{
              padding: 10,
            }}
          >
            {!this.state.showsuccess ? (
              <>
                <form
                  style={{
                    minWidth: 250,
                    paddingBottom: 6,
                  }}
                >
                  {this.renderInput(
                    "code",
                    "",
                    "code",
                    "",
                    "textclass",
                    "errorclass"
                  )}

                  {this.renderButton(
                    !this.state.loading ? (
                      "Join"
                    ) : (
                      <Spincrescentcomponenet size="1x" />
                    ),
                    "resendlink"
                  )}
                </form>
              </>
            ) : (
              <h3>{this.state.message}</h3>
            )}
          </div>
        </div>
      </LeagueModal>
    );
  }
}

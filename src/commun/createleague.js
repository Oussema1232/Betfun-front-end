import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import http from "../services/httpService";
import _ from "lodash";
import Spincrescentcomponenet from "./logos/spincrescentcomponent";
import Form from "./form";
import LeagueModal from "./modal";

class CreateLeague extends Form {
  state = {
    data: { league: "" },
    loading: false,
    errors: {},
    message: "",
    code: "",
    showmessage: false,
    showsuccess: false,
  };

  schema = {
    league: Joi.string().required().max(20).label("League"),
  };

  onclosemodal = () => {
    this.setState({
      data: { league: "" },
      message: "",
      code: "",
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
        `https://betfunbackend1.herokuapp.com/api/leagues`,
        {
          name: this.state.data.league,
          userId: this.props.userId,
          seasonId: this.props.seasonId,
          genreId: 14,
          domainId: this.props.currentdomain.id,
        }
      );
      this.setState({
        message: response.data.message,
        code: response.data.data,
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
      <LeagueModal buttonname="Create" onclosemodal={this.onclosemodal}>
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
                    "league",
                    "",
                    "league",
                    "",
                    "textclass",
                    "errorclass"
                  )}

                  {this.renderButton(
                    !this.state.loading ? (
                      "Create"
                    ) : (
                      <Spincrescentcomponenet size="1x" />
                    ),
                    "resendlink"
                  )}
                </form>
              </>
            ) : (
              <>
                <h4>{this.state.message}</h4>
                <h3 style={{ color: "green" }}>
                  The code is : {this.state.code}
                </h3>
              </>
            )}
          </div>
        </div>
      </LeagueModal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentdomain: state.betfundata.currentdomain.data,
});

export default connect(mapStateToProps, null)(CreateLeague);

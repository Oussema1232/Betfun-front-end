import React from "react";
import onClickOutside from "react-onclickoutside";

class Listpopup extends React.Component {
  state = { visibility: false };

  handleClickOutside = () => {
    this.setState({ visibility: false });
  };

  render() {
    return (
      <span>
        <div
          style={{ color: this.state.visibility ? "black" : "#e6ab2d" }}
          onClick={() => this.setState({ visibility: !this.state.visibility })}
        >
          {this.props.children}
        </div>
        <div
          style={{
            backgroundColor: "#002734",
            width: 800,
            overflow: "auto",
            borderTopRightRadius: 15,
            position: "absolute",
            right: 0,
            height: 400,
            zIndex: 1000,
            display: this.state.visibility ? "block" : "none",
          }}
        >
          {this.props.messages.map((msg) => (
            <div style={{ display: "flex" }}>
              <img
                src={msg.imgURL}
                alt={msg.username}
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
              <div>
                <div>{msg.username}</div>
         
              </div>
            </div>
          ))}
        </div>
      </span>
    );
  }
}

export default onClickOutside(Listpopup);

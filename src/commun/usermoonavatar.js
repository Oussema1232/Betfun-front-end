import React from "react";

export default function Usermoonavatar(props) {
  return (
    <div
      style={{
        width: 85,
        height: 85,
        // border: "1px solid blue",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "-22px 0px 0 0  #070427",
      }}
    >
      <img
        src={props.src}
        alt={props.alt}
        style={{
          width: 75,
          height: 75,
          borderRadius: "50%",
          userSelect: "none",
        }}
      />
    </div>
  );
}

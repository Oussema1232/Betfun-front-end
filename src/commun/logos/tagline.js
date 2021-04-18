import React from "react";

export default function Tagline(props) {
  return (
    <div
      className={props.classtagline}
      style={{
        ...props.style,
        fontFamily: "'Lobster Two', cursive",
      }}
    >
      Bet..Learn..Have fun
    </div>
  );
}

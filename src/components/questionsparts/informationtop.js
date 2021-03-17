import React from "react";
import "./style.css";
export default function InformationTop() {
  return (
    <div
      className="cool"
      style={{
        minWidth: "100%",
        fontSize: 25,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          
        }}
      >
        <div style={{ alignSelf: "flex-start" }}>Did you know</div>
        <div>
          The world war one ,known as the great war, started due the
          assassination of Archduke Franz Ferdinand of Austria, who was killed
          by a man that wanted to show his courage after not beeing accepted in
          the military
        </div>
      </div>
    </div>
  );
}

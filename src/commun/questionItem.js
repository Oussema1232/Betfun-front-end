import React from "react";
import { useSelector } from "react-redux";

export default function QuestionItem(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 900,
        minHeight: 40,
        backgroundColor: "rgba(169,121,71,0.5)",
        border: "2px dashed black",
        boxSizing: "border-box",
        marginBottom: 30,

        fontWeight: "bold",
        color: "black",
        textAlign: currentuser.language == "Eng" ? "start" : "end",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: 19,

          width: "95%",

          padding: 12,
        }}
      >
        {currentuser.language == "Arab"
          ? props.round[props.n].Arabdescription
          : props.round[props.n].Engdescription}
      </div>
      {props.round[props.n].suggestor && (
        <div
          style={{
            fontSize: 15,
            display: "flex",
            margin: 4,
            flexDirection:
              currentuser.language == "Arab" ? "row-reverse" : "row",
            textDecoration: "underline",
            fontFamily: "'Indie Flower'",
            alignSelf:
              currentuser.language == "Arab" ? "flex-start" : "flex-end",
          }}
        >
          {currentuser.language == "Arab" ? (
            <div style={{ marginLeft: 4 }}>{": المُقترح"}</div>
          ) : (
            <div style={{ marginRight: 4 }}>Suggester : </div>
          )}
          <div>{props.round[props.n].suggestor}</div>
        </div>
      )}
    </div>
  );
}

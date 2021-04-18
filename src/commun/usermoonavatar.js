import React from "react";

export default function Usermoonavatar({
  dimentionmoon,
  dimentionimage,
  username,
  boxshadowcolor = "#07617d",
  style,
}) {
  const letter = username && username.slice(0, 1).toUpperCase();
  return (
    <div
      style={{
        width: dimentionmoon,
        height: dimentionmoon,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: `-22px 0px 0 0 ${boxshadowcolor}`,
      }}
    >
      <div
        style={{
          backgroundColor: "#2e383f",
          width: dimentionimage,
          height: dimentionimage,
          borderRadius: "50%",
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fbfbfb",
          fontSize: 25,
          border: "1px solid #263238",
          fontWeight: "bold",
          ...style,
        }}
      >
        {letter}
      </div>
    </div>
  );
}

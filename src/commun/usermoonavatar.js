import React from "react";
import { motion } from "framer-motion";

export default function Usermoonavatar({
  dimentionmoon,
  dimentionimage,
  src,
  alt,
  boxshadowcolor,

  style,
}) {
  return (
    <div
      style={{
        width: dimentionmoon,
        height: dimentionmoon,
        // border: "1px solid blue",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: `-22px 0px 0 0 ${boxshadowcolor}`,
      }}
    >
      {/* <img
        src={src}
        alt={alt}
        style={{
          width: dimentionimage,
          height: dimentionimage,
          borderRadius: "50%",
          userSelect: "none",
        }}
      /> */}
      <div
        style={{
          backgroundColor: "#4c364d",
          width: dimentionimage,
          height: dimentionimage,
          borderRadius: "50%",
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#eceff1",
          fontSize: 25,
          border: "1px solid #263238",
          fontWeight: "bold",
          ...style,
        }}
      >
        H
      </div>
    </div>
  );
}

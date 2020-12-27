import React from "react";

export default function Usermoonavatar({
  dimentionmoon,
  dimentionimage,
  src,
  alt,
  boxshadowcolor,
  
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
        boxShadow: `-22px 0px 0 0 ${boxshadowcolor}`  ,
      }}
      
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: dimentionimage,
          height: dimentionimage,
          borderRadius: "50%",
          userSelect: "none",
        }}
      />
    </div>
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";

export default function Spincrescentcomponent({ color, size }) {
  return (
    <FontAwesomeIcon
      style={{ zIndex: 996 }}
      color={color}
      icon={faStarAndCrescent}
      size={size}
      className="spin"
    />
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";

export default function Spincrescentcomponent({ color }) {
  return (
    <FontAwesomeIcon
      color={color}
      icon={faStarAndCrescent}
      size="1x"
      className="spin"
    />
  );
}

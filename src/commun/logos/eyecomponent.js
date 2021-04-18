import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Eyecomponent(props) {
  const slash = props.slash;
  const onclick = props.onclick;
  return (
    <FontAwesomeIcon
      color="#07617d"
      icon={slash ? faEyeSlash : faEye}
      size="1x"
      onClick={onclick}
      style={{ cursor: "pointer", marginLeft: 5 }}
    />
  );
}

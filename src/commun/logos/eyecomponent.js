import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Eyecomponent(props) {
  const slash = props.slash;
  const onclick = props.onclick;
  return (
    <FontAwesomeIcon
      color="#e9eac9"
      icon={slash ? faEyeSlash : faEye}
      size="1x"
      color="#dddddd"
      onClick={onclick}
      style={{ cursor: "pointer", marginLeft: 5 }}
    />
  );
}

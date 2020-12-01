import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

export default function SimpleBadge({
  number,
  max,
  children,
  color = "primary",
}) {
  return (
    <Badge badgeContent={number} max={max} color={color}>
      {children}
    </Badge>
  );
}

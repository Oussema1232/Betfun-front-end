import React from "react";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, isclass, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{
        display: value != index ? "none" : "block",
      }}
      {...other}
    >
      {value == index && (
        <div className={!isclass ? "betstabLine" : ""}>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;

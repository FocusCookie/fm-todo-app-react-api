import React from "react";
import PropTypes from "prop-types";
import "./overview.css";
import { Button } from "../Button/Button";

export const Overview = ({
  taskLeft,
  activeFilter,
  onSetFilter,
  onClearCompleted,
  ...props
}) => {
  return (
    <div {...props} className="overview">
      overview
    </div>
  );
};

Overview.propTypes = {
  /**
   * Which filter is set active none - all - active - completed
   */
  activeFilter: PropTypes.oneOf(["none", "all", "active", "completed"]),
  /**
   * Optional click handler
   */
  onSetFilter: PropTypes.func,
};

Overview.defaultProps = {
  activeFilter: "none",
  onSetFilter: undefined,
};

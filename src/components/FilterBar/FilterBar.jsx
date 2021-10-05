import React from "react";
import PropTypes from "prop-types";
import "./filterBar.css";
import { Button } from "../Button/Button";

export const FilterBar = ({ activeFilter, onSetFilter, ...props }) => {
  return (
    <div {...props} className="filter">
      <Button
        label="All"
        active={activeFilter === "all"}
        onClick={() => onSetFilter("all")}
      />
      <Button
        label="Active"
        active={activeFilter === "active"}
        onClick={() => onSetFilter("active")}
      />
      <Button
        label="Completed"
        active={activeFilter === "completed"}
        onClick={() => onSetFilter("completed")}
      />
    </div>
  );
};

FilterBar.propTypes = {
  /**
   * Which filter is set active none - all - active - completed
   */
  activeFilter: PropTypes.oneOf(["none", "all", "active", "completed"]),
  /**
   * Optional click handler
   */
  onSetFilter: PropTypes.func,
};

FilterBar.defaultProps = {
  activeFilter: "none",
  onSetFilter: undefined,
};

import React from "react";
import PropTypes from "prop-types";
import "./overview.css";
import { Button } from "../Button/Button";
import { FilterBar } from "../FilterBar/FilterBar";

class Overview extends React.Component {
  render() {
    const {
      tasksLeft,
      activeFilter,
      onSetFilter,
      onClearCompleted,
      ...props
    } = this.props;

    return (
      <div {...props} className="overview">
        <span>{`${tasksLeft} tasks left`}</span>
        <div className="overview-filterbar">
          <FilterBar
            onSetFilter={(filter) => onSetFilter(filter)}
            activeFilter={activeFilter}
          />
        </div>
        <Button
          label="Clear Completed"
          size="small"
          onClick={() => onClearCompleted()}
        />
      </div>
    );
  }
}

Overview.propTypes = {
  /**
   * How many task are left uncompleted
   */
  tasksLeft: PropTypes.number,
  /**
   * If clear completed btn is clicked
   */
  onClearCompleted: PropTypes.func,
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
  tasksLeft: 0,
  activeFilter: "none",
  onClearCompleted: undefined,
  onSetFilter: undefined,
};

export { Overview };

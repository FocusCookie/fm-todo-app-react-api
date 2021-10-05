import React from "react";
import PropTypes from "prop-types";
import "./overview.css";
import { Button } from "../Button/Button";
import { FilterBar } from "../FilterBar/FilterBar";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const {
      taskLeft,
      activeFilter,
      onSetFilter,
      onClearCompleted,
      ...props
    } = this.props;

    return (
      <div {...props} className="overview">
        <span>{`${taskLeft} tasks left`}</span>
        {this.state.width > 400 ? (
          <FilterBar onSetFilter={(filter) => onSetFilter(filter)} />
        ) : null}
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
  taskLeft: PropTypes.number,
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
  taskLeft: 0,
  activeFilter: "none",
  onClearCompleted: undefined,
  onSetFilter: undefined,
};

export { Overview };

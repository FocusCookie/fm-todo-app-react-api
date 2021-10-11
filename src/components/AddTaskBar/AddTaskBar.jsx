import React from "react";
import PropTypes from "prop-types";
import "./addTaskBar.css";

class AddTaskBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const task = event.target.value;
    this.setState({ task: task });
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter" && this.state.task !== "") {
      this.props.onAddTask(this.state.task);
      this.setState({ task: "" });
    }
  };

  render() {
    const { onAddTask } = this.props;

    const displaySaveBtn =
      this.state.task !== "" ? (
        <button
          className="addbar-adtbtn"
          onClick={() => onAddTask(this.state.task)}
        >
          add
        </button>
      ) : null;

    return (
      <div className="addbar">
        <div className="circle"></div>

        <input
          type="text"
          id="addTask"
          className="addbar-task"
          placeholder="Create a new todo.."
          name="task"
          value={this.state.task}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />

        {displaySaveBtn}
      </div>
    );
  }
}

AddTaskBar.propTypes = {
  // Handler if a task is entered and commited via the save btn or hitting enter
  onAddTask: PropTypes.func,
};

AddTaskBar.defaultProps = {
  onAddTask: undefined,
};

export { AddTaskBar };

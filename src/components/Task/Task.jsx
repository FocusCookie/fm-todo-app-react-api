import React from "react";
import PropTypes from "prop-types";
import "./task.css";
import crossIcon from "../../images/icon-cross.svg";
import checkIcon from "../../images/icon-check.svg";

//TODO: Refactor this component into  a component class with state so to change the input on change, This is right now a functional component
// https://reactjs.org/docs/forms.html

export const Task = ({
  task: { id, completed, description },
  onCompleteTask,
  onDeleteTask,
  ...props
}) => {
  let checked;
  if (completed) {
    checked = (
      <img
        tabIndex="1"
        src={checkIcon}
        className="check--checked"
        alt="Check a task as complete."
      />
    );
  } else {
    checked = <div tabIndex="1" className="check--unchecked"></div>;
  }

  return (
    <div class="task" {...props}>
      <div
        className={`checkbox ${completed ? "checkbox-bg" : ""}`}
        onClick={(event) => onCompleteTask(id)}
      >
        {checked}
      </div>

      <input
        type="text"
        id="description"
        className={`description ${completed ? "text--checked" : ""}`}
        name="description"
        defaultValue={description}
      />
      <div onClick={(event) => event.stopPropagation()}>
        <button
          className="delete"
          onClick={() => {
            onDeleteTask(id);
          }}
        >
          <img src={crossIcon} className="delete-icon" alt="Delete task." />
        </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  /** Composition of the task */
  id: PropTypes.shape({
    // Id of the task
    id: PropTypes.string.isRequired,

    // description of the task or the actual task
    description: PropTypes.string.isRequired,

    // State of the task
    completed: PropTypes.bool,
  }),

  /**  Optional click handler   */
  onClick: PropTypes.func,

  /**  Handler for clicking the complete checkbox */
  onCompleteTask: PropTypes.func,

  /**  Handler for clicking the Cross icon */
  onDeleteTask: PropTypes.func,
};

Task.defaultProps = {
  onClick: undefined,
  onCompleteTask: undefined,
  onDeleteTask: undefined,
};

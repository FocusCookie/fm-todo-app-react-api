import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./task.css";
import crossIcon from "../../images/icon-cross.svg";
import checkIcon from "../../images/icon-check.svg";

export const Task = ({
  task,
  onCompleteTask,
  onDeleteTask,
  onSaveTask,
  ...props
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(task.description);
  }, [task.description]);

  let checked;
  if (task.completed) {
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

  const saveBtn = (
    <button className="save-btn" onClick={() => onSaveTask(task._id, value)}>
      save
    </button>
  );

  return (
    <div className="task">
      <div
        className={`checkbox ${task.completed ? "checkbox-bg" : ""}`}
        onClick={() => onCompleteTask(task._id)}
      >
        {checked}
      </div>

      <input
        type="text"
        id="description"
        className={`description ${task.completed ? "text--checked" : ""}`}
        name="description"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      {task.description !== value ? saveBtn : null}

      <div onClick={(event) => event.stopPropagation()}>
        <button
          className="delete"
          onClick={() => {
            onDeleteTask(task._id);
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
  task: PropTypes.shape({
    // Id of the task
    _id: PropTypes.string.isRequired,

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

  /**  Handler when the input is changed */
  onSaveTask: PropTypes.func,
};

Task.defaultProps = {
  onClick: undefined,
  onCompleteTask: undefined,
  onDeleteTask: undefined,
  onSaveTask: undefined,
};

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./task.css";
import crossIcon from "../../images/icon-cross.svg";
import checkIcon from "../../images/icon-check.svg";

export const Task = ({
  task,
  disabled,
  onCompleteTask,
  onDeleteTask,
  onSaveTask,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setValue(task.description);
    setIsUpdating(false);
  }, [task]);

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
    <button
      disabled={disabled}
      className="save-btn"
      onClick={() => {
        setIsUpdating(true);
        onSaveTask(task._id, value);
      }}
    >
      save
    </button>
  );

  return (
    <div className={`task ${isDeleting || isUpdating ? "delete-glow" : ""}`}>
      <div
        disabled={disabled}
        className={`checkbox ${task.completed ? "checkbox-bg" : ""}`}
        onClick={() => {
          setIsUpdating(true);
          onCompleteTask(task._id, !task.completed);
        }}
      >
        {checked}
      </div>

      <input
        disabled={disabled}
        type="text"
        id={`description-${task._id}`}
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
          disabled={disabled}
          className="delete"
          onClick={() => {
            setIsDeleting(true);
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

  /**  disable inputs and buttons   */
  disabled: PropTypes.bool,

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
  disabled: undefined,
  onClick: undefined,
  onCompleteTask: undefined,
  onDeleteTask: undefined,
  onSaveTask: undefined,
};

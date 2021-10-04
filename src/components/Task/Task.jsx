import React from "react";
import PropTypes from "prop-types";
import "./task.css";
import crossIcon from "../../images/icon-cross.svg";

export const Task = ({
  task: { id, completed, description },
  onCompleteTask,
  onDeleteTask,
  ...props
}) => {
  return (
    <div class="task" {...props}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={completed}
          disabled={true}
          id="status"
          name="status"
        />
        <span className="checkbox-custom" onClick={() => onCompleteTask(id)} />
      </label>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
      ></input>
      <div className="task-delete" onClick={(event) => event.stopPropagation()}>
        <button
          className="task-delete-btn"
          onClick={() => {
            onDeleteTask(id);
          }}
        >
          <img
            src={crossIcon}
            className="task-delete-btn--icon"
            alt="Delete task."
          />
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

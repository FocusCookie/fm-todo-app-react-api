import React from "react";
import PropTypes from "prop-types";
import "./tasklist.css";

import { Task } from "../Task/Task";

export const Tasklist = ({
  tasks,
  loading,
  onCompleteTask,
  onDeleteTask,
  onSaveTask,
  ...props
}) => {
  const events = { onCompleteTask, onDeleteTask, onSaveTask };

  const display = function (isLoading) {
    if (isLoading) {
      return (
        <div className="loader">
          <div className="loader-item"></div>
          <div className="loader-item"></div>
          <div className="loader-item"></div>
        </div>
      );
    } else {
      if (tasks) {
        return tasks.map((task) => (
          <Task
            className="task"
            key={`task-${task._id}`}
            task={task}
            {...events}
          />
        ));
      } else {
        return "No Tasks to display :(";
      }
    }
  };

  return <div className="Tasklist">{display(loading)}</div>;
};

Tasklist.propTypes = {
  /** Array of Tasks */
  /**  Handler for clicking the complete checkbox */
  tasks: PropTypes.array,

  /**  Handler for clicking the complete checkbox */
  onCompleteTask: PropTypes.func,

  /**  Handler for clicking the Cross icon */
  onDeleteTask: PropTypes.func,

  /**  Handler when the input is changed */
  onSaveTask: PropTypes.func,
};

Tasklist.defaultProps = {
  loading: true,
  onCompleteTask: undefined,
  onDeleteTask: undefined,
  onSaveTask: undefined,
};

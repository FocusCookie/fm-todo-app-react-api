import React, { useState } from "react";
import PropTypes from "prop-types";
import "./addTaskBar.css";

export const AddTaskBar = ({ disabled, onAddTask, ...props }) => {
  const [description, setDescription] = useState("");

  const displaySaveBtn =
    description !== "" ? (
      <button
        disabled={disabled}
        className="addbar-adtbtn"
        onClick={() => onAddTask(description)}
      >
        add
      </button>
    ) : null;

  return (
    <div className="addbar" {...props}>
      <div className="circle"></div>

      <input
        disabled={disabled}
        type="text"
        id="addTask"
        className="addbar-task"
        placeholder="Create a new todo.."
        name="task"
        value={description}
        onChange={(e) => {
          const enteredDescription = e.target.value;
          setDescription(enteredDescription);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && description !== "") {
            onAddTask(description);
          }
        }}
      />

      {displaySaveBtn}
    </div>
  );
};

AddTaskBar.propTypes = {
  // Handler if a task is entered and commited via the save btn or hitting enter
  onAddTask: PropTypes.func,
  // loader
  disabled: PropTypes.bool,
};

AddTaskBar.defaultProps = {
  onAddTask: undefined,
  disabled: false,
};

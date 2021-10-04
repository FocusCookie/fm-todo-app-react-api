import React from "react";
import PropTypes from "prop-types";
import "./task.css";
import crossIcon from "../../images/icon-cross.svg";
import checkIcon from "../../images/icon-check.svg";

//TODO: Refactor this component into  a component class with state so to change the input on change, This is right now a functional component
// https://reactjs.org/docs/forms.html
/* //TODO: Checken ob die props sich aktuallisieren sprich ob sie neu gerendert werden bei einer änderung
dies geschieht mit dem nested object in storybook nämlich nicht */

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ value: this.props.task.description });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const renderTask = () => {
      const { task, onCompleteTask, onDeleteTask } = this.props;

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

      return (
        <div className="task">
          <div
            className={`checkbox ${task.completed ? "checkbox-bg" : ""}`}
            onClick={(event) => onCompleteTask(task.id)}
          >
            {checked}
          </div>

          <input
            type="text"
            id="description"
            className={`description ${task.completed ? "text--checked" : ""}`}
            name="description"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <div onClick={(event) => event.stopPropagation()}>
            <button
              className="delete"
              onClick={() => {
                onDeleteTask(task.id);
              }}
            >
              <img src={crossIcon} className="delete-icon" alt="Delete task." />
            </button>
          </div>
        </div>
      );
    };

    return renderTask();
  }
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
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

  /**  Handler when the input is changed */
  onChangeDescription: PropTypes.func,
};

Task.defaultProps = {
  onClick: undefined,
  onCompleteTask: undefined,
  onDeleteTask: undefined,
  onChangeDescription: undefined,
};

export { Task };

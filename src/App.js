import "./styles/app.css";
import { Login } from "./components/Login/Login";
import { AddTaskBar } from "./components/AddTaskBar/AddTaskBar";
import { Tasklist } from "./components/Tasklist/Tasklist";
import { Overview } from "./components/Overview/Overview";
import { FilterBar } from "./components/FilterBar/FilterBar";
import { Button } from "./components/Button/Button";
import moonIconPath from "./images/icon-moon.svg";
import sunIconPath from "./images/icon-sun.svg";
import { useEffect, useState } from "react";

import * as api from "./services/api.service";

function App() {
  //TODO: refactor into [darkMode, setDarkMode]
  const [state, setValue] = useState({ darkMode: false });
  const [tasks, setTasks] = useState([]);
  const [loadingLogin, setLoadgingLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadTasks, setLoadTasks] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filter, setFilter] = useState("all");
  const [displayed, setDisplayed] = useState([]);
  const [ongoingAction, setOngoingAction] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      api.getTasks().then((res) => {
        setTasks(res.data);
        setDisplayed(res.data);
        setLoadTasks(false);
      });
    };

    const token = localStorage.getItem("token");

    if (token && token !== "") {
      setLoggedIn(true);
      setLoadTasks(true);
      fetchData();
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  function tasksByFilter(tasks, filter) {
    let newDisplayed;
    if (filter === "all") newDisplayed = tasks.slice();

    if (filter === "active") newDisplayed = tasks.filter((t) => !t.completed);

    if (filter === "completed") newDisplayed = tasks.filter((t) => t.completed);

    return newDisplayed;
  }

  return (
    <div
      className={`app bg-picture ${
        state.darkMode ? "bg-picture-dark" : "bg-picture-light"
      } ${state.darkMode ? "dark-theme" : ""}`}
    >
      <div className="content-wrapper">
        <header className="App-header">
          <h1 className="text--title">TODO</h1>
          <div className="header-controls">
            <button
              className="theme-btn"
              onClick={() => {
                setValue({ darkMode: !state.darkMode });
              }}
            >
              <img
                className="theme-icon"
                src={state.darkMode ? sunIconPath : moonIconPath}
                alt={
                  state.darkMode
                    ? "Sun Icon - Dark Mode is enabled"
                    : "Moon Icon - Light Mode is enabled"
                }
              />
            </button>
            <div className="btn-logout-wrapper">
              <Button
                label="Logout"
                onClick={() => {
                  api.logout();
                  localStorage.removeItem("token");
                  setTasks([]);
                  setDisplayed([]);
                  setLoggedIn(false);
                }}
              />
            </div>
          </div>
        </header>

        <section
          className={`card addTaskBar ${
            isAddingTask ? "loading-add-task" : ""
          }`}
        >
          <AddTaskBar
            disabled={isAddingTask || loadTasks}
            onAddTask={(description) => {
              setIsAddingTask(true);

              api
                .addTask(description)
                .then((res) => {
                  const newTasks = [...tasks, res.data];
                  setTasks(newTasks);

                  let newDisplayed;
                  if (filter === "all") newDisplayed = newTasks.slice();
                  if (filter === "active")
                    newDisplayed = newTasks.filter((t) => !t.completed);
                  if (filter === "completed")
                    newDisplayed = newTasks.filter((t) => t.completed);

                  setDisplayed(newDisplayed);

                  setIsAddingTask(false);
                })
                .catch((err) => {
                  setIsAddingTask(false);
                  console.log(err);
                });
            }}
          />
        </section>

        <section className="card">
          <Tasklist
            tasks={displayed}
            disabled={ongoingAction}
            loading={loadTasks}
            onCompleteTask={(id, updateCompleteState) => {
              if (!ongoingAction) {
                setOngoingAction(true);

                api.updateTask(id, updateCompleteState).then((updatedTask) => {
                  const newTasks = tasks.slice();
                  const indexOfUpdatedTask = newTasks.findIndex(
                    (t) => t._id === id
                  );
                  newTasks[indexOfUpdatedTask] = updatedTask;
                  setTasks(newTasks);

                  setDisplayed(tasksByFilter(newTasks, filter));

                  setOngoingAction(false);
                });
              }
            }}
            onDeleteTask={(id) => {
              if (!ongoingAction) {
                setOngoingAction(true);
                api.deleteTask(id).then(() => {
                  const newTasks = tasks.filter((t) => t._id !== id);
                  setTasks(newTasks);

                  setDisplayed(tasksByFilter(newTasks, filter));

                  setOngoingAction(false);
                });
              }
            }}
            onSaveTask={(id, description) => {
              if (!ongoingAction) {
                setOngoingAction(true);

                const task = tasks.find((t) => t._id === id);

                //TODO: Refactoring API anpassen weil bei description muss complete mitgegeben werden
                api
                  .updateTask(id, task.completed, description)
                  .then((updatedTask) => {
                    const newTasks = tasks.slice();
                    const indexOfUpdatedTask = newTasks.findIndex(
                      (t) => t._id === id
                    );
                    newTasks[indexOfUpdatedTask] = updatedTask;
                    setTasks(newTasks);

                    setDisplayed(tasksByFilter(newTasks, filter));

                    setOngoingAction(false);
                  });
              }
            }}
          />
          {loadTasks ? null : (
            <div className="tasks-overview">
              <Overview
                tasksLeft={displayed.length}
                activeFilter={filter}
                onSetFilter={(newFilter) => {
                  setFilter(newFilter);

                  setDisplayed(tasksByFilter(tasks, newFilter));
                }}
                onClearCompleted={async () => {
                  if (!ongoingAction) {
                    setOngoingAction(true);

                    const unclearedTasks = tasks.filter((t) => !t.completed);
                    const clearedTasks = tasks.filter((t) => t.completed);
                    const clearPromises = clearedTasks.map((t) =>
                      api.deleteTask(t._id)
                    );

                    Promise.all(clearPromises).then(() => {
                      setTasks(unclearedTasks);
                      setDisplayed(tasksByFilter(unclearedTasks, filter));
                      setOngoingAction(false);
                    });
                  }
                }}
              />{" "}
            </div>
          )}
        </section>

        {loadTasks ? null : (
          <section className="app-filterbar card">
            <FilterBar
              activeFilter={filter}
              onSetFilter={(newFilter) => {
                setFilter(newFilter);
                let newTasks;
                if (newFilter === "all") newTasks = tasks.slice();
                if (newFilter === "active")
                  newTasks = tasks.filter((t) => !t.completed);
                if (newFilter === "completed")
                  newTasks = tasks.filter((t) => t.completed);

                setDisplayed(newTasks);
              }}
            />
          </section>
        )}
      </div>

      {loggedIn ? null : (
        <Login
          loading={loadingLogin}
          errorMsg={loginError}
          onRegister={(email, password) => {
            setLoginError("");
            setLoadgingLogin(true);

            api
              .register(email, password)
              .then((user) => {
                localStorage.setItem("token", user.token);
                setLoadgingLogin(false);
                setLoggedIn(true);
              })
              .catch((err) => {
                setLoadgingLogin(false);
                setLoginError(err.message);
                console.log(err);
              });
          }}
          onLogin={(email, password) => {
            setLoginError("");
            setLoadgingLogin(true);

            api
              .login(email, password)
              .then((user) => {
                localStorage.setItem("token", user.token);
                setLoadgingLogin(false);
                setLoggedIn(true);
              })
              .catch((err) => {
                setLoadgingLogin(false);
                setLoginError("Unable to login.");
                console.log(err);
              });
          }}
        />
      )}
    </div>
  );
}

export default App;

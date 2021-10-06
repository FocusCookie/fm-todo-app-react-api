import "./app.css";
import { AddTaskBar } from "./components/AddTaskBar/AddTaskBar";
import { Tasklist } from "./components/Tasklist/Tasklist";
import { Overview } from "./components/Overview/Overview";
import { FilterBar } from "./components/FilterBar/FilterBar";
import moonIconPath from "./images/icon-moon.svg";
import sunIconPath from "./images/icon-sun.svg";

const devTasks = [
  {
    completed: false,
    _id: "1",
    description: "reading book",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
  {
    completed: false,
    _id: "2",
    description: "buy milk",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
  {
    completed: false,
    _id: "3",
    description: "clean house",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
  {
    completed: true,
    _id: "4",
    description: "do the tasks",
    owner: "615a9d50334cdc00174ebe23",
    createdAt: "2021-10-04T06:23:08.857Z",
    updatedAt: "2021-10-04T06:23:08.857Z",
    __v: 0,
  },
];

function App() {
  return (
    <div className="App bg-picture">
      <div className="content-wrapper">
        <header className="App-header">
          <h1 className="text--title">TODO</h1>
          <button className="theme-btn">
            <img className="theme-icon" src={moonIconPath} alt="Moon icon" />
          </button>
        </header>

        <section className="card addTaskBar">
          <AddTaskBar onAddTask={(e) => console.log(e)} />
        </section>

        <section className="card">
          <Tasklist
            tasks={devTasks}
            loading={false}
            onCompleteTask={(e) => {
              console.log("complete ", e);
            }}
            onDeleteTask={(e) => {
              console.log("delete ", e);
            }}
            onSaveTask={(id, description) => {
              console.log("save ", id, description);
            }}
          />
          <div className="tasks-overview">
            <Overview
              taskLeft={5}
              activeFilter={"all"}
              onSetFilter={(filter) => console.log("filter set to ", filter)}
              onClearCompleted={(id) => console.log("clear completed tasks")}
            />{" "}
          </div>
        </section>

        <section className="app-filterbar card">
          <FilterBar
            activeFilter={"all"}
            onSetFilter={(filter) => console.log("filter set to ", filter)}
          />
        </section>
      </div>
    </div>
  );
}

export default App;

import "./app.css";
import { AddTaskBar } from "./components/AddTaskBar/AddTaskBar";
import { Tasklist } from "./components/Tasklist/Tasklist";

function App() {
  return (
    <div className="App bg-picture">
      <header className="App-header">
        <h1 className="text--title">TODO</h1>
        <button className="themeBtn">x</button>
      </header>

      <section className="card addTaskBar">
        <AddTaskBar onAddTask={(e) => console.log(e)} />
      </section>

      <section className="card">
        <Tasklist />
      </section>
    </div>
  );
}

export default App;

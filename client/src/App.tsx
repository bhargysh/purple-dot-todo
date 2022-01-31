import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const [todos, setToDos] = useState([]);
  const [filter, setFilter] = useState("SHOW_ALL");
  useEffect(() => {
    getToDos();
  }, [setFilter]);
  const host = "http://localhost:5001/";

  function createToDo(description: string, completed = false) {
    const id = uuidv4();
    axios
      .post(`${host}todo`, {
        body: JSON.stringify({ id, description, completed }),
      })
      .then((response) => {
        console.debug("POST status:", response.status);
      })
      .then(() => {
        getToDos();
      }).catch(e => console.error(`Cannot make POST request, following error is thrown ${e}`));
  }

  function getToDos() {
    axios
      .get(`${host}${filter}`)
      .then((response) => {
        console.log("RESPONSE >>>>>>>>", response.data);

        return response.data;
      })
      .then((data) => {
        console.log("DATA-----------", data);
        setToDos(data);
      }).catch(e => console.error(`Cannot make GET request, following error is thrown ${e}`));
  }

  function deleteToDo(id: string) {
    axios
      .delete(`${host}todo/${id}`)
      .then((response) => {
        console.debug("DELETE status:", response.status);
      })
      .then(() => {
        getToDos();
      }).catch(e => console.error(`Cannot make DELETE request, following error is thrown ${e}`));
  }
  return (
    <div>
      <form
        id="add-new-todo"
        onSubmit={(event) => createToDo(event.currentTarget.value)}
      >
        <h2>Add a new todo:</h2>
        <input
          type="text"
          id="new-todo-desc"
          className="new-todo-desc"
          name="todo description"
        />
        <button type="submit" className="todo-submit-button">
          Add Todo
        </button>
      </form>
      <br />

      <div className="todos-list">
        <h2>Current Todos:</h2>
        {todos ? (
          todos.map(({ id, description, completed }) => (
            <li className="todo">
              <div className="todo-completed">
                <input
                  id={id}
                  value={description}
                  defaultChecked={completed}
                  type="checkbox"
                />
                <label className="todo-description" htmlFor="todo-description">
                  {description}
                </label>
              </div>
              <div className="delete-todo">
                <button id="delete-todo-btn" onClick={() => deleteToDo(id)}>
                  Delete ToDo
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No more Todos left!</p>
        )}
      </div>
      <br />

      <div className="filter-button-group">
        <button
          type="button"
          className="show-all-todos-button"
          aria-pressed="true"
          onClick={() => setFilter("SHOW_ALL")}
        >
          Show All Todos
        </button>
        <br />
        <button
          type="button"
          className="show-completed-todos-button"
          aria-pressed="true"
          onClick={() => setFilter("SHOW_COMPLETED")}
        >
          Show Completed Todos
        </button>
        <br />
        <button
          type="button"
          className="show-active-todos-button"
          aria-pressed="true"
          onClick={() => setFilter("SHOW_ACTIVE")}
        >
          Show Active Todos
        </button>
        <br />
        <button
          type="button"
          className="clear-todos-button"
          aria-pressed="true"
          onClick={() => setFilter("CLEAR_ALL")}
        >
          Clear All Todos
        </button>
      </div>
      <br />
    </div>
  );
}

export default App;

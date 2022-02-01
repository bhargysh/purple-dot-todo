import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const [todos, setToDos] = useState([]);
  const [filter, setFilter] = useState("SHOW_ALL");
  useEffect(() => {
    getToDos();
  }, [filter]);
  const host = "http://localhost:3001/";

  function createToDo(description: string, completed = false) {
    const id = uuidv4();
    axios
      .post(`${host}todo`, {
        body: JSON.stringify({ id, description, completed }),
      })
      .then((response) => {
        console.debug("POST status:", response.status);
        getToDos();
      })
      .catch((e) =>
        console.error(
          `Cannot make POST request, following error is thrown ${e}`
        )
      );
  }

  function getToDos() {
    axios
      .get(`${host}${filter}`)
      .then((response) => {
        setToDos(response.data);
        return response.data;
      })
      .catch((e) =>
        console.error(`Cannot make GET request, following error is thrown ${e}`)
      );
  }

  function deleteToDo(id: string) {
    axios
      .delete(`${host}todo/${id}`)
      .then((response) => {
        console.debug("DELETE status:", response.status);
      })
      .then(() => {
        getToDos();
      })
      .catch((e) =>
        console.error(
          `Cannot make DELETE request, following error is thrown ${e}`
        )
      );
  }

  function onChangeFilter(filter: string) {
    setFilter(filter);
    getToDos();
  }

  return (
    <div>
      <div>
        <form
          id="add-new-todo"
          onSubmit={(e: React.SyntheticEvent) => {
            // e.preventDefault();
            const target = e.target as typeof e.target & {
              text: { value: string };
            };
            const desc = target.text.value;
            createToDo(desc);
          }}
        >
          <div>
            <h2> Add Todo</h2>
            <label>
              Enter here:
              <input
                type="text"
                name="text"
                id="new-todo-desc"
                className="new-todo-desc"
              />
            </label>
          </div>
          <div>
            <button type="submit" className="todo-submit-button">
              Add Todo
            </button>
          </div>
        </form>
      </div>
      <br />

      <div className="todos-list">
        <h2>Current Todos:</h2>
        {todos ? (
          todos.map(({ id, description, completed }) => (
            <div className="todo-completed" id={id} key={id}>
              <input
                id={id}
                value={description}
                defaultChecked={completed}
                type="checkbox"
              />
              <label className="todo-description" htmlFor="todo-description">
                {description}
              </label>
              <button id="delete-todo-btn" onClick={() => deleteToDo(id)}>
                Delete ToDo
              </button>
            </div>
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
          onClick={() => onChangeFilter("SHOW_ALL")}
        >
          Show All Todos
        </button>
        <br />
        <button
          type="button"
          className="show-completed-todos-button"
          aria-pressed="true"
          onClick={() => onChangeFilter("SHOW_COMPLETED")}
        >
          Show Completed Todos
        </button>
        <br />
        <button
          type="button"
          className="show-active-todos-button"
          aria-pressed="true"
          onClick={() => onChangeFilter("SHOW_ACTIVE")}
        >
          Show Active Todos
        </button>
        <br />
        <button
          type="button"
          className="clear-todos-button"
          aria-pressed="true"
          onClick={() => onChangeFilter("CLEAR_ALL")}
        >
          Clear All Todos
        </button>
      </div>
      <br />
    </div>
  );
}

export default App;

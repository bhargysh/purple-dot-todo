import { DatabaseError } from "pg";
import { pool } from "./db";
import { Filter } from "../models/filter";
import { Todo } from "../models/todo";

const getToDos = (completed?: boolean) => {
  return new Promise(function (resolve, reject) {
    if (completed !== undefined)
      pool.query(
        "SELECT * FROM todos where completed=$1",
        [completed],
        (error: DatabaseError, results: any) => {
          if (error) {
            reject(error);
          }
          resolve(results.rows);
        }
      );
    else {
      pool.query(
        "SELECT * FROM todos",
        (error: DatabaseError, results: any) => {
          if (error) {
            reject(error);
          }
          resolve(results.rows);
        }
      );
    }
  });
};

const deleteToDos = () => {
  return new Promise(function (resolve, reject) {
    pool.query(`DELETE FROM todos`, (error: DatabaseError) => {
      if (error) {
        reject(error);
      }
      resolve("All todos deleted");
    });
  });
};

export const createToDo = (details: Todo) => {

  return new Promise(function (resolve, reject) {
    const { id, description, completed } = details;
    pool.query(
      "INSERT INTO todos (id, description, completed) VALUES ($1, $2, $3)",
      [id, description, completed],
      (error: DatabaseError, results: any) => {
        if (error) {
          reject(error);
        }
        resolve(`A new todo has been added: ${results}`);
      }
    );
  });
};

export const deleteToDo = (id: string) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `DELETE FROM todos WHERE id=$1`,
      [id],
      (error: DatabaseError) => {
        if (error) {
          reject(error);
        }
        resolve("All todos deleted");
      }
    );
  });
};

export const getTodosBasedOnFilter = async (filter: Filter) => {
  switch (filter.name) {
    case "SHOW_COMPLETED":
      return await getToDos(true);
    case "SHOW_ACTIVE":
      return await getToDos(false);
    case "SHOW_ALL":
      return await getToDos();
    case "CLEAR_ALL":
      return await deleteToDos();
  }
};

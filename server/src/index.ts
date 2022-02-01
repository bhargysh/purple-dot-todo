import express from "express";
import cors from "cors";
import BodyParser from "body-parser";
import "dotenv/config";
import {
  getTodosBasedOnFilter,
  createToDo,
  deleteToDo,
} from "./repository/queries";

const app = express();
const port = 3001;

app.use(cors());
app.use(BodyParser.json())
app.use(
  BodyParser.urlencoded({ extended: true })
)

app.get("/:filter", (req, res) => {
  const filter = req.params.filter;
  getTodosBasedOnFilter({ name: filter })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/todo", (req, res) => {
  const details = JSON.parse(req.body.body);

  createToDo(details)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/todo/:id", (req, res) => {
  deleteToDo(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port: ${port} weehoo!`);
});

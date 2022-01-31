import express from "express";
import cors from "cors";
import BodyParser from "body-parser";
import "dotenv/config";
import {
  getTodosBasedOnFilter,
  createToDo,
  deleteToDo,
} from "./repository/queries";

// access db locally: psql -h localhost -p 5432 -U bharg -d dev

const app = express();
const port = 5001;
// const allowedOrigins = ['http://localhost:3000'];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };

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
  createToDo(req.body)
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
  console.log(`App running on port: ${port}`);
});

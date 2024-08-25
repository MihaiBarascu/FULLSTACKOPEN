require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log(url);
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  importance: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose.connect(url);

app.use(express.json());
app.use(cors());

morgan.token("jsonData", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.jsonData(req, res),
    ].join(" ");
  })
);

app.use(express.static("dist"));
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello world!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((n) => n.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () =>
  notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 0;
app.post("/api/notes", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.content) {
    return response.status(404).json({ error: "content missing" });
  }
  const note = {
    content: body.content,
    id: generateId(),
    important: Boolean(body.important) || false,
  };
  notes = notes.concat(note);
  response.json(note);
});

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.map((n) => (n.id === id ? req.body : n));
  res.status(200).json(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);

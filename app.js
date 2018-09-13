const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const NotesRouter = require("./routes/notes-router");

const app = express();
const DB_URL = "mongodb://localhost:27017";
const DB_NAME = "notes-app";
const PORT = 3000;

function onMongoConnect(err, client) {
  if (err) {
    return console.log("Error connecting to DB");
  }

  const db = client.db(DB_NAME);

  app.use("/notes", NotesRouter(db));
  app.listen(PORT);
}

MongoClient.connect(
  DB_URL,
  onMongoConnect
);

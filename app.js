const express = require("express");
const app = express();

const PORT = 3000;

function getTest(req, res) {
  res.send("Hello world in test");
}

app.get("/test", getTest);
app.get("/root", getTest);
app.listen(PORT);

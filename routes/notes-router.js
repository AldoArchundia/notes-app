const express = require("express");

const NotesRouterFactory = db => {
  const notesRouter = express.Router();

  notesRouter.get("/", (req, res) => {
    db.collection("notes")
      .find({})
      .toArray((err, notes) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        }

        res.json({ notes });
      });
  });
  return notesRouter;
};

module.exports = NotesRouterFactory;

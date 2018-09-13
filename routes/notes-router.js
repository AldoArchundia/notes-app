const express = require("express");

const NotesRouterFactory = notesService => {
  const notesRouter = express.Router();

  notesRouter.get("/", (req, res) => {
    notesService.getAll((err, notes) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      }

      res.json({ notes });
    });
  });

  notesRouter.get("/:id", (req, res) => {
    notesService.getOneById(req.params.id, (err, note) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ note });
    });
  });

  notesRouter.post("/", (req, res) => {
    notesService.createOne(req.body, (err, note) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(201).json({ note });
    });
  });
  return notesRouter;
};

module.exports = NotesRouterFactory;

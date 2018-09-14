const express = require("express");

const NotesRouterFactory = notesService => {
  const notesRouter = express.Router();

  notesRouter.get("/", (req, res) => {
    notesService
      .getAll()
      .then(notes => {
        res.json({ notes });
      })
      .catch(err => {
        res.status(500).json({ error: "Internal server error" });
      });
  });

  notesRouter.get("/:id", (req, res) => {
    notesService
      .getOneById(req.params.id)
      .then(note => {
        if (note === null) {
          res.status(404).json({ message: "Note not found" });
        } else {
          res.json({ note });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Internal server error" });
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

  notesRouter.delete("/:id", (req, res) => {
    notesService.deleteOneById(req.params.id, err => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(200).json({});
    });
  });

  notesRouter.put("/:id", (req, res) => {
    notesService.updateOneById(req.params.id, req.body, (err, note) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ note });
    });
  });
  return notesRouter;
};

module.exports = NotesRouterFactory;

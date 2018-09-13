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
      if (note === null) {
        return res.status(404).json({ message: "Note not found" });
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
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(200).json({ note });
    });
  });
  return notesRouter;
};

module.exports = NotesRouterFactory;

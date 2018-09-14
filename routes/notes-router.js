const express = require("express");

const NotesRouterFactory = notesService => {
  const notesRouter = express.Router();

  notesRouter.get("/", async (req, res) => {
    try {
      const notes = await notesService.getAll();
      res.json({ notes });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  notesRouter.get("/:id", async (req, res) => {
    try {
      const note = await notesService.getOneById(req.params.id);
      if (note === null) {
        res.status(404).json({ message: "Note not found" });
      } else {
        res.json({ note });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  notesRouter.post("/", async (req, res) => {
    try {
      const note = await notesService.createOne(req.body);
      res.status(201).json({ note });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  notesRouter.delete("/:id", async (req, res) => {
    try {
      await notesService.deleteOneById(req.params.id);
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  notesRouter.put("/:id", async (req, res) => {
    try {
      const note = await notesService.updateOneById(req.params.id, req.body);
      res.status(200).json({ note });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  return notesRouter;
};

module.exports = NotesRouterFactory;

import express, { Request, Response } from "express";
import Note from "../models/Note";
import jwt from "jsonwebtoken";

const router = express.Router();

// GET /notes - Get all notes by user ID
router.get("/notes/:id", async (req: Request, res: Response) => {
  try {
    const token = req.params.id;

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: number;
    };

    const notes = await Note.findAll({
      where: { userId: decodedToken.userId },
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /notes/getOne/:id - Get a single note by ID
router.get("/notes/getOne/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.json(note);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /notes - Create a new note
router.post("/notes", async (req: Request, res: Response) => {
  const { title, content, token } = req.body;

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: number;
  };

  try {
    const note = await Note.create({
      title,
      content,
      userId: decodedToken.userId,
    });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /notes/:id - Update a note by ID
router.put("/notes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      await note.update({ title, content });
      res.json(note);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /notes/:id - Delete a note by ID
router.delete("/notes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    } else {
      await note.destroy();
      res.json({ message: "Note deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

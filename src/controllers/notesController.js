import createHttpError from 'http-errors';
import { Note } from "../models/note.js";

// GET /notes
export const getAllNotes = async (res, req) => {
const notes = await Note.find();
res.status(200).json(notes);
};

// GET /notes/:noteId
export const getNoteById = async (res, req) => {
  const { notesId } =  req.params;
    const note = await Note.findById(notesId);

  if (!note) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(note);
};

// POST /notes
export const createNote = async (res, req) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

//DELETE /notes/:noteId
export const deleteNote = async (res, req) => {
  const {noteId} = req.params;
    const note = await Note.findOneAndDelete({_id: noteId, });
    if (!note) {
      throw createHttpError(404, "Student not found");
    }
    res.status(201).json(note);
};

// PATCH /notes/:noteId
export const updateNote = async (res, req) => {
  const {noteId} = req.params;

    const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { returnDocument: "after" }, // повертаємо оновлений документ
  );
      if (!note) {
      throw createHttpError(404, "Student not found");
    }
    res.status(200).json(note);
};

import createHttpError from 'http-errors';
import { Note } from "../models/note.js";

// GET /notes
export const getAllNotes = async (req, res) => {
  const { tag, search, page, perPage } = req.query;
  const userId = req.user._id;

  const skip = (page - 1) * perPage;

  // Обов'язково фільтруємо за userId
  const dataQuery = Note.find({ userId });
  const countQuery = Note.countDocuments({ userId });

  if (tag) {
    dataQuery.where('tag').equals(tag);
    countQuery.where('tag').equals(tag);
  }

  if (search) {
    const searchRegex = { $regex: search, $options: 'i' };
    const searchConditions = [
      { title: searchRegex },
      { content: searchRegex }
    ];

    dataQuery.where().or(searchConditions);
    countQuery.where().or(searchConditions);
  }

  const [totalNotes, notes] = await Promise.all([
    countQuery,
    dataQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  // Замість findById використовуємо findOne з перевіркою userId
  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// POST /notes
export const createNote = async (req, res) => {
  const userId = req.user._id;

  // Додаємо userId до тіла запиту при створенні
  const note = await Note.create({
    ...req.body,
    userId,
  });

  res.status(201).json(note);
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  // Замість findByIdAndDelete використовуємо findOneAndDelete з перевіркою userId
  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};

// PATCH /notes/:noteId
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  // Замість findByIdAndUpdate використовуємо findOneAndUpdate з перевіркою userId
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    req.body,
    { returnDocument: "after" },
  );

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};


/* import createHttpError from 'http-errors';
import { Note } from "../models/note.js";

// GET /notes
export const getAllNotes = async (req, res) => {
  const { tag, search, page, perPage } = req.query;

  const skip = (page - 1) * perPage;

  const dataQuery = Note.find();
  const countQuery = Note.countDocuments();

  if (tag) {
    dataQuery.where('tag').equals(tag);
    countQuery.where('tag').equals(tag);
  }

  if (search) {
    const searchRegex = { $regex: search, $options: 'i' };
    const searchConditions = [
      { title: searchRegex },
      { content: searchRegex }
    ];

    dataQuery.where().or(searchConditions);
    countQuery.where().or(searchConditions);
  }

  const [totalNotes, notes] = await Promise.all([
    countQuery,
    dataQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } =  req.params;
    const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// POST /notes
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json(note);
};

// PATCH /notes/:noteId
export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndUpdate(
    noteId,
    req.body,
    { returnDocument: "after" },
  );

  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json(note);
};
*/

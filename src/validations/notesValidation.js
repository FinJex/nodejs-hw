import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
const tagsList = require('../constants/tags.js');

//allNotes
export const getAllNotesSchema = {
[Segments.BODY]: Joi.object({
page: Joi.number().integer().min(1).default(1),
perPage: Joi.number().integer().min(5).max(20).default(10),
tag: Joi.string().valid(...tagsList).optional(),
search: Joi.string().optional(),
})
};


//NotesId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
})};

//Post
export const createNoteSchema = {
[Segments.PARAMS]: Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().optional(),
  tag: Joi.valid(...tagsList).optional(),
 })
};

//Patch
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
  title: Joi.string().min(1).optional(),
  content: Joi.string().optional(),
  tag: Joi.valid(...tagsList).optional(),
  }).min(1),
};


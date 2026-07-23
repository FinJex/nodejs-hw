import { Router } from "express";
import { celebrate } from "celebrate";

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notesController.js";

import {
  createStudentSchema,
  getStudentsSchema,
  studentIdParamSchema,
  updateStudentSchema,
} from "../validations/notesValidation.js";

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from "../controllers/authController.js";

import {
  registerUserSchema,
  loginUserSchema,
} from "../validations/authValidations.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/refresh", refreshUserSession);
router.post("/auth/logout", logoutUser);

router.use("/students", authenticate);

router.get("/students", celebrate(getStudentsSchema), getAllNotes);
router.get("/students/:studentId", celebrate(studentIdParamSchema), getNoteById);
router.post("/students", celebrate(createStudentSchema), createNote);
router.delete("/students/:studentId", celebrate(studentIdParamSchema), deleteNote);
router.patch("/students/:studentId", celebrate(updateStudentSchema), updateNote);

export default router;

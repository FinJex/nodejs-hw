import { Router } from "express";
import { celebrate } from "celebrate";

import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentsController.js";

import {
  createStudentSchema,
  getStudentsSchema,
  studentIdParamSchema,
  updateStudentSchema,
} from "../validations/studentsValidation.js";

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from "../controllers/authController.js";

import {
  registerUserSchema,
  loginUserSchema,
} from "../validations/authValidation.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/refresh", refreshUserSession);
router.post("/auth/logout", logoutUser);

router.use("/students", authenticate);

router.get("/students", celebrate(getStudentsSchema), getStudents);
router.get("/students/:studentId", celebrate(studentIdParamSchema), getStudentById);
router.post("/students", celebrate(createStudentSchema), createStudent);
router.delete("/students/:studentId", celebrate(studentIdParamSchema), deleteStudent);
router.patch("/students/:studentId", celebrate(updateStudentSchema), updateStudent);

export default router;

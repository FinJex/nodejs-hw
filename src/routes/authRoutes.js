import { Router } from "express";
import { celebrate } from "celebrate";

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

import { resetPassword } from '../controllers/authController.js';
import { resetPasswordSchema } from '../validations/authValidation.js';

import { requestResetEmail } from '../controllers/authController.js';
import { requestResetEmailSchema } from '../validations/authValidation.js';
const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/refresh", refreshUserSession);
router.post("/auth/logout", logoutUser);

router.post('/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);
router.post("/auth/request-reset-email", celebrate(requestResetEmailSchema), requestResetEmail);

export default router;

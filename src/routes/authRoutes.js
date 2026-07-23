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
} from "../validations/authValidations.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/refresh", refreshUserSession);
router.post("/auth/logout", logoutUser);

router.use("/students", authenticate);


export default router;

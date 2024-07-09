import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { userSchema } from "../schemas/userSchemas.js";
import { auth } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), register);
authRouter.post("/login", validateBody(userSchema), login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, getCurrentUser);

export default authRouter;

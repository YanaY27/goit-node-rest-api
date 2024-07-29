import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
} from "../controllers/authControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { userSchema } from "../schemas/userSchemas.js";
import { auth } from "../middlewares/auth.js";
import upload from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), register);
authRouter.post("/login", validateBody(userSchema), login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, getCurrentUser);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

export default authRouter;

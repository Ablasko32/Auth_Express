import express from "express";
import {
  getRegisterController,
  getLoginController,
} from "../controllers/auth_controller.js";

const authRouter = express.Router();

// Get Register
authRouter.get("/register", getRegisterController);

// Get Login
authRouter.get("/login", getLoginController);

export { authRouter };

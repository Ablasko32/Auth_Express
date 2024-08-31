import express from "express";
import {
  getRegisterController,
  getLoginController,
  PostRegisterController,
  PostLoginController,
} from "../controllers/auth_controller.js";

const authRouter = express.Router();

// Get Register
authRouter.get("/register", getRegisterController);

// Get Login
authRouter.get("/login", getLoginController);

//Post register
authRouter.post("/register", PostRegisterController);

//Post Login
authRouter.post("/login", PostLoginController);

export { authRouter };

import express from "express";
import {
  getRegisterController,
  getLoginController,
  PostRegisterController,
  PostLoginController,
} from "../controllers/auth_controller.js";
import passport from "../config/passport.js";
import { CSRFProtected } from "../middleware/csrf_middlewere.js";

const authRouter = express.Router();

// Get Register
authRouter.get("/register", getRegisterController);

// Get Login
authRouter.get("/login", getLoginController);

//Post register
authRouter.post("/register", CSRFProtected, PostRegisterController);

//Post Login
authRouter.post(
  "/login",

  CSRFProtected,
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
  })
);

// GOOGLE
// google auth
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/secret",
    failureRedirect: "/login",
  })
);

export { authRouter };

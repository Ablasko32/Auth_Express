import express from "express";
import { getSecretpage } from "../controllers/secret_controller.js";
import { protectWithLogin } from "../middleware/auth_middleware.js";

const secretRouter = express.Router();

secretRouter.get("/secret", protectWithLogin, getSecretpage);

export { secretRouter };

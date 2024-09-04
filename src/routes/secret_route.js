import express from "express";
import { getSecretpage } from "../controllers/secret_controller.js";

const secretRouter = express.Router();

secretRouter.get("/secret", getSecretpage);

export { secretRouter };

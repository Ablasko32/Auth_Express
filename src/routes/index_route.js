import express from "express";
import { get_index } from "../controllers/index_controller.js";

const IndexRouter = express.Router();

IndexRouter.get("/", get_index);

export { IndexRouter };

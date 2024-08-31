import express from "express";
import { configDotenv } from "dotenv";
import { IndexRouter } from "./routes/index_route.js";
import { authRouter } from "./routes/auth_route.js";

configDotenv();

const app = express();
const default_port = process.env.APP_PORT;

app.use(express.static("public"));

// Routers
app.use("/", IndexRouter);
app.use("/", authRouter);

app.listen(default_port, () => {
  console.log(`Server listening on port localhost:${default_port}`);
});

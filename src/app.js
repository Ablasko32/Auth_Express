import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const default_port = process.env.APP_PORT;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.listen(default_port, () => {
  console.log(`Server listening on port localhost:${default_port}`);
});

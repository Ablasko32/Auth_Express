import express from "express";
import csrf from "csrf-token";
import { configDotenv } from "dotenv";
import { IndexRouter } from "./routes/index_route.js";
import { authRouter } from "./routes/auth_route.js";
import { secretRouter } from "./routes/secret_route.js";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "./config/passport.js";
import { CsrfMiddlewere } from "./middleware/csrf_middlewere.js";
import "./config/config.js";

const app = express();
const default_port = process.env.APP_PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// session menagment
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// csrf middlewere
app.use(CsrfMiddlewere);

app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/", IndexRouter);
app.use("/", authRouter);
app.use("/", secretRouter);

app.listen(default_port, "0.0.0.0", () => {
  console.log(`Server listening on port localhost:${default_port}`);
});

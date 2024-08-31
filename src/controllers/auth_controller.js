import db from "../config/database.js";

// Get register
export function getRegisterController(req, res) {
  res.render("register.ejs");
}

// Get login
export function getLoginController(req, res) {
  res.render("login.ejs");
}

// Post regsiter
export function PostRegisterController(req, res) {
  res.send("POST REGISTER");
}

// Post Login
export function PostLoginController(req, res) {
  res.send("POST Login");
}

import db from "../config/database.js";
import bcrypt from "bcrypt";

// Get register
export function getRegisterController(req, res) {
  res.render("register.ejs");
}

// Get login
export function getLoginController(req, res) {
  res.render("login.ejs");
}

// Post regsiter
export async function PostRegisterController(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const doesUserExist = await db.query(
      "SELECT * FROM users WHERE email=$1;",
      [email]
    );
    // if user exists redirect to login page, else begin registration process
    if (doesUserExist.rows.length > 0) {
      res.redirect("/login");
    } else {
      // bcrypt for hashing 10 salt rounds, and then insert in table
      bcrypt.hash(password, 10, async (err, hash) => {
        const insertData = await db.query(
          "INSERT INTO users(email, password) VALUES ($1,$2)",
          [email, hash]
        );
      });
      res.redirect("/secret");
    }
  } catch (err) {
    console.log(err);
  }
}

// Post Login
export function PostLoginController(req, res) {
  res.send("POST Login");
}

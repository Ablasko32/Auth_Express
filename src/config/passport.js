import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import db from "./database.js";
import bcrypt from "bcrypt";

passport.use(
  "local",
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const doesUserExists = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [username]
      );
      if (doesUserExists.rows.length > 0) {
        const user = doesUserExists.rows[0];
        bcrypt.compare(password, user.password, (err, valid) => {
          if (err) {
            console.log("Error coparing passwords" + err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return null, false;
            }
          }
        });
      } else {
        return cb("User doesnt exists");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

// google strategy
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (acessToken, refreshToken, profile, cb) => {
      // Checks to see if user exists, if it does it callbacks user, if not inserts new user and callbacks that user
      try {
        const doesUserExist = await db.query(
          "SELECT * FROM users WHERE email=$1",
          [profile.email]
        );
        if (doesUserExist.rows.length === 0) {
          const insertNewUser = await db.query(
            "INSERT INTO users(email,password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, insertNewUser.rows[0]);
        } else {
          return cb(null, doesUserExist.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const loadUser = await db.query("SELECT * FROM users WHERE id=$1", [id]);
    cb(null, loadUser.rows);
  } catch (err) {
    cb(err, null);
  }
});

export default passport;

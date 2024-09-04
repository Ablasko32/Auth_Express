import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
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

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const loadUser = await db.query("SELECT * FROM users WHERE id=$1", [id]);
    cb(null, loadUser);
  } catch (err) {
    cb(err, null);
  }
});

export default passport;

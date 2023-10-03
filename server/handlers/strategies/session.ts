import session from "express-session";
import passport from "passport";

const sessionConfig = session({
  secret: "mysecret",
});

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, "user");
});

export { sessionConfig };

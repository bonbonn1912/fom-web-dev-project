import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import CONFIG from "../../config";


 const sessionConfig = session({
  secret: "keyboard cat",
  saveUninitialized: true, // don't create session until something stored //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl:  CONFIG.MONGO_DB_URL +"/" + CONFIG.SESSION_DB,
    collectionName: "user_sessions",
  }),
  cookie: { maxAge: 1000 * 60 * 2 },
})

passport.serializeUser(function (user, done) {
  done(null, user);
});
//TODO An db anbinden
passport.deserializeUser(function (user, done) {
  done(null, "user");
});

export { sessionConfig };

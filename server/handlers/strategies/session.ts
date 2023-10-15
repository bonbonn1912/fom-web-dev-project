import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import CONFIG from "../../config";
import {findUser} from "../database/postgres";


 const sessionConfig = session({
  secret: "keyboard cat",
  saveUninitialized: true, // don't create session until something stored //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl:  CONFIG.MONGO_DB_URL +"/" + CONFIG.SESSION_DB,
    collectionName: "user_sessions",
  }),
  cookie: { maxAge: 1000 * 60 * 50 },
})

passport.serializeUser(function (user, done) {
  done(null, user);
});
//TODO An db anbinden
passport.deserializeUser(async (user: any, done) => {
  const currentUser = await findUser(user.username, "NOT_VALID_EMAIL");
  if(currentUser == null){
        return done(null, false);
  }
  const { accountId, username, displayName, setup, accountType } = currentUser as any;
  const userData = {
    auth: true,
    setup: setup,
    displayName: displayName,
    username: username,
    id: accountId
  }
  done(null, userData);
});

export { sessionConfig };

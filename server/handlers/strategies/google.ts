import strategy from "passport-google-oauth20";
import CONFIG from "../../config";
import { findUser, insertUser, insertStravaToken } from "../database/postgres";
import { AccountType } from "@prisma/client";
import { IGoogleUser } from "../../types/google";
import { IAccount } from "../../types/user";

const StravaStrategy = strategy.Strategy;

export const googleRegisterStrategy = new StravaStrategy(
  {
    clientID: CONFIG.GOOGLE_CLIENT_ID,
    clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/reg/google/callback",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const accountType = AccountType.GOOGLE;
    const { displayName, id } = profile as IGoogleUser;
    // funktion sucht nach username ODER password. Unvalid mail dass sicher nichts gefunden wird
    // bei google logins ist der username die profileid.
    // Im frontend muss display_name oder ähnliches genutzt werden
    const user = await findUser(id, "NOT_VALID_EMAIL");
    if (user != null) {
      return done(null, false, { message: "1" }); // 1 User existiert bereits. Login nutzen
    }
    let randomMail = (Math.random() + 1).toString(36).substring(7); //TODO Lösung für mail constraint (alternative zu unique?)
    const newUser = (await insertUser(
      id,
      displayName,
      randomMail,
      "",
      accountType
    )) as IAccount;
    if (newUser) {
      console.log("Google User");
      return done(null, newUser);
    }
  }
);

export const googleLoginStrategy = new StravaStrategy(
  {
    clientID: CONFIG.GOOGLE_CLIENT_ID,
    clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/log/google/callback", //TODO In config
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    //@ts-ignore
    const { id, displayName } = profile as IGoogleUser;

    const user = await findUser(id, "NOT_VALID_EMAIL");
    console.log(user);
    if (user != null) {
      return done(null, user); // Login erfolgreich
    }
    return done(null, false, { message: "1" }); // es existiert noch kein user -> register page nutzen
  }
);

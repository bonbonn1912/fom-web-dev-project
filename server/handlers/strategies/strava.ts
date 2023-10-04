import strategy from "@riderize/passport-strava-oauth2";
import CONFIG from "../../config";
import { findUser, insertUser, insertStravaToken } from "../database/postgres";
import { AccountType } from "@prisma/client";
import { tokenResponse } from "../../types/strava";
import { IAccount } from "../../types/user";

const StravaStrategy = strategy.Strategy;

export const stravaRegisterStrategy = new StravaStrategy(
  {
    clientID: CONFIG.STRAVA_CLIENT_ID,
    clientSecret: CONFIG.STRAVA_CLIENT_SECRET,
    callbackURL: "/auth/reg/strava/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const accountType = AccountType.STRAVA
    //@ts-ignore
    let stravaProfile = profile as stravaUser
    const profileId = stravaProfile.id.toString()
    const displayName = stravaProfile.fullName
    // funktion sucht nach username ODER password. Unvalid mail dass sicher nichts gefunden wird
    // bei strava logins ist der username die profileid. 
    // Im frontend muss display_name oder ähnliches genutzt werden
    const user = await findUser(profileId, "NOT_VALID_EMAIL")
    if(user != null){
      return done(null, false, { message: "1" }); // 1 User existiert bereits. Login nutzen
    }
    const newUser = await insertUser(profileId,displayName,"", "",  accountType) as IAccount
    if(newUser){
      const tokenData: tokenResponse = {
        token_type: "Bearer",
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 3600*60, // Access token ist 6h Gültig
        expires_at: Date.now() + 3600*60 // Timestamp bis wann token gültig ist
      }
      await insertStravaToken(newUser.accountId,tokenData)
      console.log("Strava user created")
      return done(null, newUser)
    }
  }
);

export const stravaLoginStrategy = new StravaStrategy(
  {
    clientID: CONFIG.STRAVA_CLIENT_ID,
    clientSecret: CONFIG.STRAVA_CLIENT_SECRET,
    callbackURL: "/auth/log/strava/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    //@ts-ignore
    let stravaProfile = profile as stravaUser
    const profileId = stravaProfile.id.toString()
    const displayName = stravaProfile.fullName
    const user = await findUser(profileId, "NOT_VALID_EMAIL")
    if(user != null){
      return done(null, user); // Login erfolgreich
    }
    return done(null, false, { message: "1" }); // es existiert noch kein user -> register page nutzen
  }
);

interface stravaUser {
  id: number,
  username: string,
  firtname: string,
  lastname: string,
  fullName: string,
}

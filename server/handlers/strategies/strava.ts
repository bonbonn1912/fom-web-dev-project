import strategy from "@riderize/passport-strava-oauth2";
import CONFIG from "../../config";
import {findUser, insertUser, insertStravaToken, setStravaConnection} from "../database/postgres";
import { AccountType} from "@prisma/client";
import { IStravaUser, ITokenResponse } from "../../types/strava";
import { IAccount } from "../../types/user";

const StravaStrategy = strategy.Strategy;

export const stravaRegisterStrategy = new StravaStrategy(
  {
    clientID: CONFIG.STRAVA_CLIENT_ID,
    clientSecret: CONFIG.STRAVA_CLIENT_SECRET,
    callbackURL: "/auth/reg/strava/callback",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const accountType = AccountType.STRAVA;
    //@ts-ignore
    let stravaProfile = profile as IStravaUser;
    const profileId = stravaProfile.id.toString();
    const displayName = stravaProfile.fullName;
    // funktion sucht nach username ODER password. Unvalid mail dass sicher nichts gefunden wird
    // bei strava logins ist der username die profileid.
    // Im frontend muss display_name oder ähnliches genutzt werden
    const user = await findUser(profileId, "NOT_VALID_EMAIL");
    if (user != null) {
      return done(null, false, { message: "1" }); // 1 User existiert bereits. Login nutzen
    }
    let randomMail = (Math.random() + 1).toString(36).substring(7); //TODO Lösung für mail constraint (alternative zu unique?)

    const newUser = (await insertUser(
      profileId,
      displayName,
      randomMail,
      "",
      accountType
    )) as IAccount;
    if (newUser) {
      const tokenData: ITokenResponse = {
        token_type: "Bearer",
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 3600 * 60, // Not used
        expires_at: 0, // Fetch real expire date from strava after first webhook
      };
      await insertStravaToken(newUser.accountId, parseInt(profileId),tokenData);
      return done(null, newUser);
    }
  }
);

export const stravaLoginStrategy = new StravaStrategy(
  {
    clientID: CONFIG.STRAVA_CLIENT_ID,
    clientSecret: CONFIG.STRAVA_CLIENT_SECRET,
    callbackURL: "/auth/log/strava/callback",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    //@ts-ignore
    let stravaProfile = profile as stravaUser;
    const profileId = stravaProfile.id.toString();
    const displayName = stravaProfile.fullName;
    const user = await findUser(profileId, "NOT_VALID_EMAIL");
    if (user != null) {
      return done(null, user); // Login erfolgreich
    }
    return done(null, false, { message: "1" }); // es existiert noch kein user -> register page nutzen
  }
);

export const stravaConnectionStrategy = new StravaStrategy(
    {
        clientID: CONFIG.STRAVA_CLIENT_ID,
        clientSecret: CONFIG.STRAVA_CLIENT_SECRET,
        callbackURL: "/auth/strava/connect/callback",
        passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
        //@ts-ignore
        const ownerId = parseInt(profile.id);
        const{ id } = req.user as any;
        try{
            const tokenData: ITokenResponse = {
                token_type: "Bearer",
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 3600 * 60, // not used
                expires_at: 0,
            };
            await insertStravaToken(id,ownerId, tokenData);
            await setStravaConnection(id, true);
            return done(null, req.user);
        }catch (err){
            return done(err, false)
        }

    }
);

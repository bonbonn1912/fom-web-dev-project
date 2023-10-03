import strategy from "@riderize/passport-strava-oauth2";

const StravaStrategy = strategy.Strategy;

export const stravaStrategy = new StravaStrategy(
  {
    clientID: "xxx",
    clientSecret: "xxx",
    callbackURL: "xxx",
  },
  function (accessToken, refreshToken, profile, done) {}
);

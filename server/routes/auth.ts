import { Router } from "express";
import { registerUser } from "../controller";
import passport from "passport";
import { localStrategy } from "../handlers/strategies/local";
import { stravaStrategy } from "../handlers/strategies/strava";
import { sessionConfig } from "../handlers/strategies/session";
import { loginUser } from "../controller/AuthController/auth";


const authRouter = Router();

authRouter.use(sessionConfig)

authRouter.use(passport.initialize())
authRouter.use(passport.session())


authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/local",loginUser);

// TODO den Teil noch in einen controller moven
passport.use('strava', stravaStrategy)
authRouter.get('/auth/strava', passport.authenticate('strava', {scope: ["activity:read_all,profile:read_all"]}));

export default authRouter;

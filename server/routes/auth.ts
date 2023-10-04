import { Router } from "express";
import { registerUser } from "../controller";
import passport from "passport";
import { sessionConfig } from "../handlers/strategies/session";
import { loginStravaUser, loginUser, registerStravaUser } from "../controller/AuthController/auth";


const authRouter = Router();

authRouter.use(sessionConfig)

authRouter.use(passport.initialize())
authRouter.use(passport.session())


authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/local",loginUser);

authRouter.get('/auth/reg/strava', registerStravaUser);
authRouter.get('/auth/reg/strava/callback', registerStravaUser);

authRouter.get('/auth/log/strava',loginStravaUser);
authRouter.get('/auth/log/strava/callback',loginStravaUser);
export default authRouter;

import { Router } from "express";
import { registerUser } from "../controller";
import passport from "passport";
import { sessionConfig } from "../handlers/strategies/session";
import {
  loginStravaUser,
  loginUser,
  registerStravaUser,
  registerGoogleUser,
  loginGoogleUser,
} from "../controller/AuthController/auth";

const authRouter = Router();

authRouter.use(sessionConfig);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/local", loginUser);

authRouter.get("/auth/reg/strava", registerStravaUser);
authRouter.get("/auth/reg/strava/callback", registerStravaUser);

authRouter.get("/auth/log/strava", loginStravaUser);
authRouter.get("/auth/log/strava/callback", loginStravaUser);

authRouter.get("/auth/reg/google", registerGoogleUser);
authRouter.get("/auth/reg/google/callback", registerGoogleUser);

authRouter.get("/auth/log/google", loginGoogleUser);
authRouter.get("/auth/log/google/callback", loginGoogleUser);
export default authRouter;

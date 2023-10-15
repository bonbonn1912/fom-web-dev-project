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
  validateLocalUser,
    connectStravaUser
} from "../controller/AuthController/auth";

const authRouter = Router();

authRouter.use(sessionConfig);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get("/auth/status", (req, res) => {

    if (req.isAuthenticated()) {
      return res.json(req.user);
    } else {
      return res.json({ auth: req.isAuthenticated() });
    } 

 
});

authRouter.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

authRouter.post("/auth/validate", validateLocalUser )

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/local", loginUser);

authRouter.get("/auth/strava/connect", connectStravaUser);
authRouter.get("/auth/strava/connect/callback", connectStravaUser);

authRouter.get("/auth/reg/strava", registerStravaUser);
authRouter.get("/auth/reg/strava/callback", registerStravaUser);

authRouter.get("/auth/log/strava", loginStravaUser);
authRouter.get("/auth/log/strava/callback", loginStravaUser);

authRouter.get("/auth/reg/google", registerGoogleUser);
authRouter.get("/auth/reg/google/callback", registerGoogleUser);

authRouter.get("/auth/log/google", loginGoogleUser);
authRouter.get("/auth/log/google/callback", loginGoogleUser);
export default authRouter;

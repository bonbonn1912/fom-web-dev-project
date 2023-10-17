import { NextFunction, Request, Response } from "express";
import { IRegisterUser, IAccount } from "../../types/user";
import { findUser, insertUser } from "../../handlers/database/postgres";
import bcrypt from "bcrypt";
import { localStrategy } from "../../handlers/strategies/local";
import {
  stravaLoginStrategy,
  stravaRegisterStrategy,
    stravaConnectionStrategy
} from "../../handlers/strategies/strava";
import {
  googleRegisterStrategy,
  googleLoginStrategy,
} from "../../handlers/strategies/google";
import passport from "passport";
import { AccountType } from "@prisma/client";

passport.use("local", localStrategy);
passport.use("stravaLogin", stravaLoginStrategy);
passport.use("stravaRegister", stravaRegisterStrategy);
passport.use("googleRegister", googleRegisterStrategy);
passport.use("googleLogin", googleLoginStrategy);
passport.use("stravaConnection", stravaConnectionStrategy);


export const registerUser = async (req: Request, res: Response) => {
  const accountType = AccountType.LOCAL; // 1 Local, 2 Strava, 3 Google
  const { username, mail, password } = req.body as IRegisterUser;
  try {
    const user = await findUser(username, mail);
    if (user == null) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const account = (await insertUser(
        username,
        username, // Nur bei local
        mail,
        hashedPassword,
        accountType
      )) as IAccount;
      if (account !== null) {
        return res.redirect("/");
      }
    } else {
     return res.redirect("/register?error")
    }
  } catch (err) {
    return res.redirect("/register?error")
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local",{
    successRedirect: "/dashboard", 
    failureRedirect: "/",
})(req, res, next)
};

export const loginStravaUser = async (req: Request,res: Response,next: NextFunction) => {
  passport.authenticate("stravaLogin",{
    successRedirect: "/dashboard", 
    failureRedirect: "/",
})(req, res, next)
};

export const registerStravaUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("stravaRegister",{scope: ["activity:read_all,profile:read_all"],
    successRedirect: "/dashboard", 
    failureRedirect: "/",
})(req, res, next)
};

export const connectStravaUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        passport.authenticate("stravaConnection",{
          scope: ["activity:read_all,profile:read_all"],
            successRedirect: "/dashboard/profile/connection",
            failureRedirect: "/",
        })(req, res, next)
    }

export const validateLocalUser = async (
  req: Request, 
  res: Response,
  next: NextFunction) =>{
    let isUsername = req.body.hasOwnProperty("username")
    let isEmail = req.body.hasOwnProperty("mail")
    if(isUsername){
      let user = await findUser(req.body.username, "")
      if(user == null){
        res.status(204).send()
        return;
      }else{
        res.status(200).send()
        return;
      }
    }
    if(isEmail){
      let user = await findUser("", req.body.mail)
      if(user == null){
        res.status(204).send()
        return;
      }else{
        res.status(200).send()
        return;
      }
    }
  }


export const registerGoogleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("googleRegister",{
    successRedirect: "/dashboard", 
    failureRedirect: "/",
})(req, res, next)
};

export const loginGoogleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("googleLogin",{
    successRedirect: "/dashboard", 
    failureRedirect: "/",
})(req, res, next)
};

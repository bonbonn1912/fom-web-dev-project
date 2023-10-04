import { NextFunction, Request, Response } from "express";
import { IRegisterUser, IAccount } from "../../types/user";
import { findUser, insertUser } from "../../handlers/database/postgres";
import bcrypt from "bcrypt";
import { localStrategy } from "../../handlers/strategies/local";
import { stravaLoginStrategy, stravaRegisterStrategy } from "../../handlers/strategies/strava";
import passport from "passport";
import { AccountType } from "@prisma/client";

passport.use("local", localStrategy);
passport.use("stravaLogin", stravaLoginStrategy);
passport.use("stravaRegister", stravaRegisterStrategy)

export const registerUser = async (req: Request, res: Response) => {
  const accountType = AccountType.LOCAL// 1 Local, 2 Strava, 3 Google
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
        res.status(200).json({ user: account.accountId });
      }
    } else {
      console.log("user found");
      res.status(400).json({ reason: "user already exists" });
    }
  } catch (err) {
    res.status(400).json({ reason: err });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
        console.log(err)
      return next(err);
    }
    if (!user) {
      switch(info.message){
        case "1": 
        return res.status(401).json({ message: "Incorrect Password" });
        case "2":
        return res.status(401).json({ message: "This User does not exist" });
      }
    }
    return res.redirect("/?result=success");
   // return res.status(200).json({ message: "Authentication successful", user });
  })(req, res, next);
};

export const loginStravaUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("stravaLogin", (err: any, user: any, info: any) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      switch(info.message){
        case "1": 
        return res.status(401).json({ message: "User does not exist" });
      }
    }
    return res.redirect("/?result=success");
  })(req, res, next);
};

export const registerStravaUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("stravaRegister", (err: any, user: any, info: any) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      switch(info.message){
        case "1": 
        return res.redirect("/?result=fail,userexits,uselogin")
      }
    }
    return res.redirect("/?result=success,nowlogin");
  })(req, res, next);
};





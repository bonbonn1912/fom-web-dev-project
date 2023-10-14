import { Strategy as LocalStrategy } from "passport-local";
import express = require("express");
import { getUserAndCredentials } from "../database/postgres";
import bcrypt from "bcrypt";
import passport from "passport";

export const localStrategy = new LocalStrategy(
  { usernameField: "mail", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await getUserAndCredentials(email);
      if (user == null || user == undefined) { // undefinded kann es eigentlich nie sein
        return done(null, false, { message: "2" });
      }
      // @ts-ignore
      // TODO User credentials Interface erstellen
      const isPasswordMatch = await bcrypt.compare(password,user.credentials.password);
      if(!isPasswordMatch){
        return done(null, false, { message: "1" });
      }
      return done(null, user);
    } catch {}
  }
);
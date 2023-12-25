import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
import dotenv from "dotenv";
import chalk from "chalk";
import UserModel from "../models/userModel.js";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await UserModel.findOne({ email: profile.email });
        if (!user) {
          const newUser = await UserModel.create({
            name: profile.given_name + " " + profile.family_name,
            email: profile.email,
            provider: "google",
            avatar: profile.picture,
          });
          done(null, newUser);
        } else {
          if (user.provider !== "google") {
            throw new Error(
              "The email has already been registered with another provider."
            );
          }
          done(null, user);
        }
      } catch (error) {
        return done(null, false);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      // Find the user by email
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      // If everything passes, return the user
      return done(null, user);
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, (user as IUser)._id);
});

passport.deserializeUser(async function (
  id: string,
  done: (err: Error | null, user?: IUser) => void
) {
  const user = await User.findById(id);
  done(null, user || undefined);
});

export default passport;

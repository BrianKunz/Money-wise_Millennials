import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model";

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      // Find the user by username
      const user = await User.findOne({ username });
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
  console.log("Serialized user:", user);
  done(null, (user as IUser)._id);
});

passport.deserializeUser(async function (
  id: string,
  done: (err: Error | null, user?: IUser) => void
) {
  try {
    console.log("Deserialized user ID:", id);
    const user = await User.findById(id);
    console.log("Deserialized user:", user);
    done(null, user || undefined);
  } catch (error) {
    console.error("Error in deserializeUser:", error);
    done(error as Error);
  }
});

export default passport;

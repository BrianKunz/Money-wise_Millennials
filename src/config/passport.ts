import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User, { IUser } from "../models/user.model";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "defaultSecret",
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
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

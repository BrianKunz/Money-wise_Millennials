import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User, { IUser } from "../models/user.model";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

// console.log("options: ", options);
// console.log("mongo-uri", process.env.MONGO_URI);
// console.log("temp-mongo-uri", process.env.TEMP_MONGO_URI);

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      console.log("Decoded token: ", jwtPayload.sub);
      const user = await User.findById(jwtPayload.userId);
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

// Log authToken
export const logAuthToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  console.log("authToken:", authToken);
  next();
};

export default passport;

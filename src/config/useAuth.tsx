import { useEffect, useState } from "react";
import { IUser } from "../models/user.model";
import passport from "passport";

function useAuth(): { isAuthenticated: boolean; user: IUser | null } {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    // Implement your authentication logic here using Passport.js
    passport.authenticate("local", (err, user) => {
      if (err) {
        console.error("Error authenticating user:", err);
        return;
      }
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    })();
  }, []);

  return { isAuthenticated, user };
}

export default useAuth;

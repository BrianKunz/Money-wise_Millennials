import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const authToken = cookies.authToken;

  const login = async (username, password) => {
    const user = {
      username: username,
      password: password,
    };
    try {
      const response = await userService.login(user as IUser); // Cast 'user' as IUser

      // Store the authentication token in cookies
      setCookie("authToken", authToken);

      // Set the user state
      setUser(response);

      // Redirect to the desired page
      navigate("/dashboard"); // Replace "/dashboard" with your desired page
    } catch (error) {
      console.error("Error logging in: ", error);
      // Handle login error
    }
  };

  const logout = () => {
    // Remove the authentication token from cookies
    removeCookie("authToken");

    // Clear the user state
    setUser(null);

    // Redirect to the login page or desired page
    navigate("/login"); // Replace "/login" with your desired page
  };

  return { user, login, logout };
};

export default useAuth;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

const useAuth = () => {
  // Initialize the user state as null
  const [user, setUser] = useState<IUser | null>(null);

  // Get the navigate function from the react-router-dom
  const navigate = useNavigate();

  // Retrieve the authToken from localStorage
  const authToken = localStorage.getItem("authToken");
  console.log("authToken:", authToken);

  // Define the login function
  const login = async (username, password) => {
    const user = {
      username: username,
      password: password,
    };
    try {
      // Call the login function from the userService to authenticate the user
      const response = await userService.login(user as IUser); // Cast 'user' as IUser

      // Store the authentication token in localStorage
      localStorage.setItem("authToken", response.token);
      console.log("authToken:", response.token);

      // Set the user state with the response data
      setUser(response);

      // Redirect to the desired page
      navigate("/posts"); // Replace "/dashboard" with your desired page
    } catch (error) {
      console.error("Error logging in: ", error);
      // Handle login error
    }
  };

  // Define the logout function
  const logout = () => {
    // Remove the authentication token from localStorage
    localStorage.removeItem("authToken");

    // Clear the user state
    setUser(null);

    // Redirect to the login page or desired page
    navigate("/login"); // Replace "/login" with your desired page
  };

  // Return the user, login, and logout functions as an object
  return { user, login, logout };
};

export default useAuth;

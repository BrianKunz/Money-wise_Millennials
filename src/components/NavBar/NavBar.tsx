import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if the user is logged in based on the authToken in sessionStorage
    const authToken = sessionStorage.getItem("authToken");
    console.log(authToken);
    setIsLoggedIn(!!authToken);

    // Retrieve the username from sessionStorage
    setUsername(
      authToken ? JSON.parse(atob(authToken.split(".")[1])).username : ""
    );

    if (authToken) {
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      console.log(decodedToken);
    } else {
      console.log("No authToken found.");
    }
  }, []);

  const handleLogout = () => {
    // Simulate a logout action
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        {/* <li>
          <Link to="/">Worksheets</Link>
        </li> */}
        {/* <li>
          <Link to="/">Quick Tips</Link>
        </li> */}
        {isLoggedIn ? (
          <>
            <li>
              <p>{username}</p>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/users">Log In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

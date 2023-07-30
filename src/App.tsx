import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";
import { User } from "./components/User/User";
import NavBar from "./components/NavBar/NavBar";
import AdminPage from "./components/User/Admin";
import "./App.scss";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authToken exists in sessionStorage
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/users" element={<User />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/*"
              element={
                isLoggedIn ? (
                  <Navigate to="/posts" replace={true} />
                ) : (
                  <Navigate to="/users" replace={true} />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

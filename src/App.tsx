import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";
import { User } from "./components/User/User";
import NavBar from "./components/Comments/NavBar/NavBar";
import "./App.scss";

const App: React.FC = () => {
  // Example condition to determine the initial route based on user authentication
  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/users" element={<User />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<Post />} />
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

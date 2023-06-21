import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";
import { User } from "./components/User/User";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

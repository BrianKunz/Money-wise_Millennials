import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";
import CreateUser from "./components/User/CreateUser/createUser";
import LoginUser from "./components/User/LoginUser/loginUser";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import CreatePost from "../Post/CreatePost/CreatePost";
import "./Admin.scss";

const AdminPage = () => {
  return (
    <div className="full-container">
      <h1>Admin Page</h1>
      <div className="admin-container">
        <CreatePost />
      </div>
    </div>
  );
};

export default AdminPage;

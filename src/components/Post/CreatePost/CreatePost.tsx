import React from "react";
import { useCreatePost } from "./useCreatePost";
import "./CreatePost.scss";

const CreatePost = () => {
  const { postFormInputs, handleFormInputChange, handlePostSubmit } =
    useCreatePost();

  return (
    <div className="container">
      <h2>Create Post</h2>
      <form onSubmit={handlePostSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postFormInputs.title}
            onChange={handleFormInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            value={postFormInputs.image}
            onChange={handleFormInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Post</label>
          <textarea
            id="body"
            name="body"
            value={postFormInputs.body}
            onChange={handleFormInputChange}
            rows={6}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Create post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

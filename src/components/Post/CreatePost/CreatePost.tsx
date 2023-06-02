import * as React from "react";
import { useCreatePost } from "./useCreatePost";

export default function CreatePost() {
  const { postFormInputs, handlePostFormChange, handlePostSubmit } =
    useCreatePost();

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handlePostSubmit} method="POST">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={postFormInputs.title}
            onChange={handlePostFormChange}
            required
          />
        </div>
        <div>
          <label>Post</label>
          <input
            type="text"
            name="body"
            value={postFormInputs.body}
            onChange={handlePostFormChange}
            required
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={postFormInputs.image}
            onChange={handlePostFormChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create post</button>
        </div>
      </form>
    </div>
  );
}

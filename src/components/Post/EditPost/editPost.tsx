import React from "react";
import { IPost } from "../../../models/post.model";
import { useEditPost } from "./useEditPost";

interface Props {
  post: IPost;
}

const EditPost: React.FC<Props> = ({ post }) => {
  const {
    postFormInputs,
    handlePostFormChange,
    handlePostSubmit,
    handlePostDelete,
  } = useEditPost(post);

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handlePostSubmit} method="PUT">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={postFormInputs.title}
            onChange={handlePostFormChange}
            required
          />
          <label>Body</label>
          <input
            type="text"
            name="body"
            value={postFormInputs.body}
            onChange={handlePostFormChange}
            required
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={postFormInputs.image}
            onChange={handlePostFormChange}
            required
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handlePostDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;

import * as React from "react";
import { useCreateComment } from "./useCreateComment";
import { IPost } from "../../../models/post.model";

interface Props {
  post: IPost;
}

export default function CreateComment({ post }: Props) {
  const { commentFormInputs, handleCommentFormChange, handleCommentSubmit } =
    useCreateComment(post);

  return (
    <div>
      <h4>Create Comment</h4>
      <form onSubmit={handleCommentSubmit} method="POST">
        <div>
          <label>Comment</label>
          <input
            type="text"
            name="body"
            value={commentFormInputs.body}
            onChange={handleCommentFormChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

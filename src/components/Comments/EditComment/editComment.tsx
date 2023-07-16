import React from "react";
import { IComment } from "../../../models/comment.model";
import { useEditComment } from "./useEditComment";

interface Props {
  comment: IComment;
  postId: string;
}

const EditComment: React.FC<Props> = ({ comment, postId }) => {
  const {
    commentFormInputs,
    handleCommentFormChange,
    handleCommentSubmit,
    handleCommentDelete,
  } = useEditComment(comment, postId);

  return (
    <div>
      <h4>Edit Comment</h4>
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
        <button type="submit">Update</button>
        <button type="button" onClick={handleCommentDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditComment;

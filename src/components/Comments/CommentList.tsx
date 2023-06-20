import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCommentStore } from "../../stores/useCommentStore";
import { IComment } from "../../models/comment.model";
import { usePostStore } from "../../stores/usePostStore";
import { IPost } from "../../models/post.model";
import { IUser } from "../../models/user.model";
import { useUserStore } from "../../stores/useUserStore";
import { ObjectId } from "mongoose";

interface Props {
  postId: string;
}

const CommentList: React.FC<Props> = ({ postId }) => {
  const { getOnePost } = usePostStore();
  const { comments, getAllComments } = useCommentStore();
  const { users } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      await getOnePost(postId);
      await getAllComments({ _id: postId } as IPost);
    }

    fetchData();
  }, [getOnePost, getAllComments, postId]);

  return (
    <div>
      <h1>Comment List</h1>
      <div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment: IComment) => {
            const userId: string = (comment.user as ObjectId).toString();
            const user: IUser | undefined = users[userId];
            return (
              <div key={comment._id}>
                <h3>
                  {user && "username" in user ? user.username : "Unknown User"}
                </h3>
                <p>{comment.body}</p>
              </div>
            );
          })
        ) : (
          <p>No comments found</p>
        )}
      </div>
      <Link to={`/posts/${postId}`}>Go back to Post</Link>
    </div>
  );
};

export default CommentList;

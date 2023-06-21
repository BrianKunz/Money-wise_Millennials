import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCommentStore } from "../../stores/useCommentStore";
import { IComment } from "../../models/comment.model";
import { usePostStore } from "../../stores/usePostStore";
import { IPost } from "../../models/post.model";
import { useUserStore } from "../../stores/useUserStore";

interface Props {
  postId: string;
}

const CommentList: React.FC<Props> = ({ postId }) => {
  const { getOnePost } = usePostStore();
  const { comments, getAllComments } = useCommentStore();
  const { getUserById } = useUserStore();
  const [commentUsers, setCommentUsers] = useState<{
    [commentId: string]: string;
  }>({});

  useEffect(() => {
    async function fetchData() {
      await getOnePost(postId);
      await getAllComments({ _id: postId } as IPost);
    }

    fetchData();
  }, [getOnePost, getAllComments, postId]);

  useEffect(() => {
    async function fetchCommentUsers() {
      const users: { [userId: string]: string } = {};

      for (const comment of comments) {
        const userId: string = comment.user?.toString() ?? "";
        const user = await getUserById(userId);
        const username = user?.username ?? "Unknown User";
        users[comment._id] = username;
      }

      setCommentUsers(users);
    }

    fetchCommentUsers();
  }, [comments, getUserById]);

  return (
    <div>
      <h1>Comment List</h1>
      <div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment: IComment) => (
            <div key={comment._id}>
              <h3>{commentUsers[comment._id] ?? "Unknown User"}</h3>
              <p>{comment.body}</p>
            </div>
          ))
        ) : (
          <p>No comments found</p>
        )}
      </div>
      <Link to={`/posts`}>Go back to Posts</Link>
    </div>
  );
};

export default CommentList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCommentStore } from "../../stores/useCommentStore";
import { IComment } from "../../models/comment.model";
import { usePostStore } from "../../stores/usePostStore";
import { IPost } from "../../models/post.model";
import { useUserStore } from "../../stores/useUserStore";
import EditComment from "./EditComment/editComment";

interface Props {
  postId: string;
}

const CommentList: React.FC<Props> = React.memo(({ postId }) => {
  const { getOnePost } = usePostStore();
  const { comments, getAllComments } = useCommentStore();
  const { getUserById } = useUserStore();
  const [commentUsers, setCommentUsers] = useState<{
    [commentId: string]: string;
  }>({});
  console.log("CommentList compontent mounted");

  useEffect(() => {
    console.log("Fetching post");
    async function fetchData() {
      console.log("Running fetchData");
      await getOnePost(postId);
      const authToken = localStorage.getItem("authToken") || "";
      await getAllComments({ _id: postId } as IPost, authToken);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Fetching comment users");
    async function fetchCommentUsers() {
      const users: { [userId: string]: string } = {};

      for (const comment of comments) {
        const userId: string = comment.user?.toString() ?? "";
        console.log("Fetching user by ID:", userId);
        const user = await getUserById(userId);
        const username = user?.username ?? "Unknown User";
        users[comment._id] = username;
      }

      console.log("Setting comment users");
      setCommentUsers(users);
    }

    console.log("Running fetchCommentUsers");
    fetchCommentUsers();
  }, []);

  return (
    <div>
      <h1>Comment List</h1>
      <div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment: IComment) => (
            <div key={comment._id}>
              <div>
                <h3>{commentUsers[comment._id] ?? "Unknown User"}</h3>
                <p>{comment.body}</p>
              </div>
              <div>
                <EditComment comment={comment} />
              </div>
            </div>
          ))
        ) : (
          <p>No comments found</p>
        )}
      </div>
      <Link to={`/posts`}>Go back to Posts</Link>
    </div>
  );
});

export default CommentList;

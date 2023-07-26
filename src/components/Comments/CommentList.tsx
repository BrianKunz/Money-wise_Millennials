import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCommentStore } from "../../stores/useCommentStore";
import { IComment } from "../../models/comment.model";
import { IPost } from "../../models/post.model";
import { useUserStore } from "../../stores/useUserStore";
import EditComment from "./EditComment/editComment";

interface Props {
  postId: string;
}

const CommentList: React.FC<Props> = React.memo(({ postId }) => {
  const { id = "" } = useParams();
  const { comments, getAllComments } = useCommentStore();
  const { getUserById } = useUserStore();
  const [commentUsers, setCommentUsers] = useState<{
    [commentId: string]: string;
  }>({});
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  useEffect(() => {
    console.log("Fetching comments and comment users");

    async function fetchCommentsAndUsers() {
      const authToken = localStorage.getItem("authToken") || "";
      const postInfo = { _id: postId } as IPost;
      await getAllComments(postInfo, authToken);

      const users: { [userId: string]: string } = {};

      for (const comment of comments) {
        const userId: string = comment.user?.toString() ?? "";
        console.log("Fetching user by ID:", userId);
        const user = await getUserById(userId);
        const username = user?.username ?? "";
        users[comment._id] = username;
      }

      console.log("Setting comment users");
      setCommentUsers(users);
    }

    fetchCommentsAndUsers();
  }, [getAllComments]);

  const handleCommentClick = (commentId: string) => {
    setSelectedCommentId(commentId === selectedCommentId ? null : commentId);
  };

  return (
    <div>
      <h1>Comments</h1>
      <div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment: IComment) => (
            <div key={comment._id}>
              <div onClick={() => handleCommentClick(comment._id)}>
                <h3>{commentUsers[comment._id] ?? ""}</h3>
                <p>{comment.body}</p>
              </div>
              {selectedCommentId === comment._id && (
                <div>
                  <EditComment comment={comment} postId={id} />
                </div>
              )}
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

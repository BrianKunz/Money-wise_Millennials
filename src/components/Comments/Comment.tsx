import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommentStore } from "../../stores/useCommentStore";
import { IPost } from "../../models/post.model";
import { IComment } from "../../models/comment.model";

const Comment: React.FC = () => {
  const { id = "" } = useParams();
  const { getAllComments, comments } = useCommentStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      const authToken = localStorage.getItem("authToken") || "";
      await getAllComments({ _id: id } as IPost, authToken);
      setLoading(false);
    }

    console.log("comment is setting this off");
    fetchComments();
  }, [getAllComments, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {comments.map((comment: IComment) => (
        <div key={comment._id}>
          <h3>
            {comment.user && "username" in comment.user
              ? comment.user.username
              : ""}
          </h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;

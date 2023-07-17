import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../stores/usePostStore";
import CommentList from "../Comments/CommentList";
import CreateComment from "../Comments/CreateComment/CreateComment";
import "./Post.scss";

const Post: React.FC = () => {
  const { id = "" } = useParams();
  const { getOnePost, post } = usePostStore();
  const [loading, setLoading] = useState(true);
  const [showCreateComment, setShowCreateComment] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      await getOnePost(id);
      setLoading(false);
    }

    fetchPost();
  }, [getOnePost, id]);

  const handleCreateCommentClick = () => {
    setShowCreateComment(!showCreateComment);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div className="post-container">
      <div>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        <p>{post.body}</p>
      </div>
      <div className="create-comment-container">
        <div
          className="create-comment-trigger"
          onClick={handleCreateCommentClick}
        >
          Click here to create comment
        </div>
        {showCreateComment && <CreateComment post={post} />}
      </div>
      <CommentList postId={post._id} />
    </div>
  );
};

export default Post;

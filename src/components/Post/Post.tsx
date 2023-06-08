import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../stores/usePostStore";
import CommentList from "../Comments/CommentList";

const Post: React.FC = () => {
  const { id = "" } = useParams();
  const { getOnePost, post } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      await getOnePost(id);
      setLoading(false);
    }

    fetchPost();
  }, [getOnePost, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        <p>{post.body}</p>
      </div>
      <CommentList postId={post._id} />
    </div>
  );
};

export default Post;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../stores/usePostStore";
import CommentList from "../Comments/CommentList";
import CreateComment from "../Comments/CreateComment/CreateComment";

const Post: React.FC = () => {
  const { id = "" } = useParams();
  const { getOnePost, post } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching post 2");
    async function fetchPost() {
      console.log("fetching post 3");
      await getOnePost(id);
    }

    fetchPost();
    setLoading(false);
  }, []);
  // }, [getOnePost, id]);

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
      <CreateComment post={post} />
      <CommentList postId={post._id} />
    </div>
  );
};

export default Post;

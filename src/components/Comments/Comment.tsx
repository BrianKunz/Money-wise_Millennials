import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommentStore } from "../../stores/useCommentStore";
import { IPost } from "../../models/post.model";
import { IComment } from "../../models/comment.model";

const Comment: React.FC = () => {
  const { id = "" } = useParams();
  const { getAllComments, comments } = useCommentStore();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    async function fetchPostAndComments() {
      // Fetch the post information using the post ID
      const postInfo = await fetchPost(id);
      setPost(postInfo);

      // Fetch the comments for the post
      if (postInfo) {
        const authToken = localStorage.getItem("authToken") || "";
        await getAllComments(postInfo, authToken);
      }
      setLoading(false);
    }

    console.log("comment is setting this off");
    fetchPostAndComments();
  }, [getAllComments, id]);

  async function fetchPost(postId: string): Promise<IPost | null> {
    // Implement your logic to fetch the post information using the postId
    // Return the fetched post or null if not found
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const post = await response.json();
        return post;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} />
      <p>{post.body}</p>

      {comments.map((comment: IComment) => (
        <div key={comment._id}>
          <h3>
            {comment.user && "username" in comment.user
              ? comment.user.username
              : "Unknown User"}
          </h3>
          <p>{comment.body}</p>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;

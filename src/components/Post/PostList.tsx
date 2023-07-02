import React, { useEffect } from "react";
import { usePostStore } from "../../stores/usePostStore";
import { Link } from "react-router-dom";

export default function PostList() {
  const { posts, getAllPosts } = usePostStore();
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <div>
        <h1>Post List</h1>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <img src={post.image} alt={post.title} />
              </Link>
              <div>
                <Link to={`/posts/${post._id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.body}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}

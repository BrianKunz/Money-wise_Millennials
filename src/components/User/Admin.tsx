import React, { useEffect, useState } from "react";
import CreatePost from "../Post/CreatePost/CreatePost";
import "./Admin.scss";
import { usePostStore } from "../../stores/usePostStore";
import { Link } from "react-router-dom";
import EditPost from "../Post/EditPost/editPost";

const AdminPage = () => {
  const { posts, getAllPosts } = usePostStore();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  return (
    <div className="full-container">
      <h1>Admin Page</h1>
      <div className="admin-container">
        <CreatePost />
      </div>
      <div className="admin-postlist">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <div onClick={() => handlePostClick(post._id)}>
                <h2>{post.title}</h2>
                <div>
                  <Link to={`/posts/${post._id}`}>
                    <p>Go to post</p>
                  </Link>
                </div>
              </div>
              {selectedPostId === post._id && (
                <div>
                  <EditPost post={post} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-posts">No posts found</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

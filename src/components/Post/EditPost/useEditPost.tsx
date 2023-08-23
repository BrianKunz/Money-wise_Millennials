import { useState } from "react";
import { usePostStore } from "../../../stores/usePostStore";
import { IPost } from "../../../models/post.model";

interface FormInputs {
  title: string;
  body: string;
  image: string;
}

export function useEditPost(post: IPost) {
  const [postFormInputs, setPostFormInputs] = useState<FormInputs>({
    title: post.title,
    body: post.body,
    image: post.image,
  });
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { updatePost, deletePost } = usePostStore();

  const handlePostFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setPostFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Updated button clicked");

    if (loadingPosts) {
      return;
    }
    try {
      setLoadingPosts(true);
      const authToken = sessionStorage.getItem("authToken") || "";
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      const userIdFromToken = decodedToken.userId;
      console.log(authToken);
      console.log(decodedToken);
      console.log(userIdFromToken);
      console.log(post.user);
      console.log(userIdFromToken === post.user);

      if (userIdFromToken === post.user) {
        await updatePost(postFormInputs as IPost, authToken);
      } else {
        window.alert("Unauthorized to edit this post");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handlePostDelete = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken") || "";
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      const userIdFromToken = decodedToken.userId;

      if (userIdFromToken === post.user) {
        await deletePost(post._id, authToken);
      } else {
        window.alert("Unauthorized to delete this post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handlePostFormChange,
    handlePostSubmit,
    handlePostDelete,
    postFormInputs,
  };
}

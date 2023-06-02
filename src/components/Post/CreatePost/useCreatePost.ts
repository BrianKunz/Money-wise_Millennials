import { useState } from "react";
import { usePostStore } from "../../../stores/usePostStore";
import { IPost } from "../../../models/post.model";

interface FormInputs {
  title: string;
  body: string;
  image: string;
}

export function useCreatePost() {
  const [postFormInputs, setPostFormInputs] = useState<FormInputs>({
    title: "",
    body: "",
    image: "",
  });
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { createNewPost } = usePostStore();
  const handlePostFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setPostFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loadingPosts) {
      return;
    }
    try {
      setLoadingPosts(true);
      const post: IPost = {
        title: postFormInputs.title,
        body: postFormInputs.body,
        image: postFormInputs.image,
      } as IPost;
      await createNewPost(post);
      setPostFormInputs({
        title: "",
        body: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  return {
    handlePostSubmit,
    handlePostFormChange,
    postFormInputs,
  };
}

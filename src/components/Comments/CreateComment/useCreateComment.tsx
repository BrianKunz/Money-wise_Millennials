import { useState } from "react";
import { useCommentStore } from "../../../stores/useCommentStore";
import { IPost } from "../../../models/post.model";
import { IComment } from "../../../models/comment.model";
import { IUser } from "../../../models/user.model";

interface FormInputs {
  body: string;
}

export function useCreateComment(post: IPost) {
  const [commentFormInputs, setCommentFormInputs] = useState<FormInputs>({
    body: "",
  });
  const [loadingComments, setLoadingComments] = useState(false);
  const { createNewComment } = useCommentStore();

  const handleCommentFormChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async ({ target: { name, value } }) => {
    setCommentFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (loadingComments) {
      return;
    }

    try {
      setLoadingComments(true);

      const comment: Partial<IComment> = {
        body: commentFormInputs.body,
        post: post._id as unknown as IPost,
        user: post.user?._id as unknown as IUser,
      };

      await createNewComment(comment as IComment, post);
      setCommentFormInputs({
        body: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  };

  return {
    handleCommentFormChange,
    handleCommentSubmit,
    commentFormInputs,
  };
}

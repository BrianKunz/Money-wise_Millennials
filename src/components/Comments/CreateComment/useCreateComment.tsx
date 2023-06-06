import { useState } from "react";
import { useCommentStore } from "../../../stores/useCommentStore";
import { IPost } from "../../../models/post.model";
import { IComment } from "../../../models/comment.model";

interface FormInputs {
  timestamp: Date;
  body: string;
}

export function useCreateComment(post: IPost) {
  const [commentFormInputs, setCommentFormInputs] = useState<FormInputs>({
    timestamp: new Date(),
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

  const handleCommentSubmit = async () => {
    if (loadingComments) {
      return;
    }
    try {
      setLoadingComments(true);
      const comment: IComment = {
        body: commentFormInputs.body,
        timestamp: commentFormInputs.timestamp,
      } as IComment;
      await createNewComment(comment, post);
      setCommentFormInputs({
        body: "",
        timestamp: new Date(),
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

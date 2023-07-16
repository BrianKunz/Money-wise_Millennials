import { useState } from "react";
import { useCommentStore } from "../../../stores/useCommentStore";
import { IComment } from "../../../models/comment.model";
import { IPost } from "../../../models/post.model";

interface FormInputs {
  body: string;
}

export function useEditComment(comment: IComment, postId: string) {
  const [commentFormInputs, setCommentFormInputs] = useState<FormInputs>({
    body: comment.body,
  });
  const [loadingComments, setLoadingComments] = useState(false);
  const { updateComment, deleteComment } = useCommentStore();

  const handleCommentFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
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

      const authToken = localStorage.getItem("authToken") || "";
      await updateComment(
        comment._id,
        commentFormInputs as IComment,
        { _id: postId } as IPost,
        authToken
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentDelete = async () => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      await deleteComment(comment._id, { _id: postId } as IPost, authToken);
      // Optionally, you can perform any additional cleanup or actions after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleCommentFormChange,
    handleCommentSubmit,
    handleCommentDelete,
    commentFormInputs,
  };
}

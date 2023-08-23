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

      const authToken = sessionStorage.getItem("authToken") || "";
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      const userIdFromToken = decodedToken.userId;

      if (userIdFromToken === comment.user) {
        // The user is authorized to edit the comment
        await updateComment(
          comment._id,
          commentFormInputs as IComment,
          { _id: postId } as IPost,
          authToken
        );
      } else {
        // The user is not authorized to edit the comment
        window.alert("Unauthorized to edit the comment.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentDelete = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken") || "";
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      const userIdFromToken = decodedToken.userId;

      if (userIdFromToken === comment.user) {
        // The user is authorized to delete the comment
        await deleteComment(comment._id, { _id: postId } as IPost, authToken);
      } else {
        // The user is not authorized to delete the comment
        window.alert("Unauthorized to delete this comment.");
      }
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

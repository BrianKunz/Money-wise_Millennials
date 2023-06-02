import { useState } from "react";
import { useUserStore } from "../../../stores/useUserStore";
import { IUser } from "../../../models/user.model";

export interface FormInputs {
  email: string;
  username: string;
  password: string;
}

export function useCreateUser() {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { createUser } = useUserStore();
  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const newUser: Partial<IUser> = {
        _id: "",
        email: formInputs.email,
        username: formInputs.username,
        password: formInputs.password,
        admin: false,
        posts: [],
        comments: [],
      };
      await createUser(newUser as IUser);
      setFormInputs({
        email: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleFormChange,
    formInputs,
  };
}

import { useState } from "react";
import { useUserStore } from "../../../stores/useUserStore";
import { IUser } from "../../../models/user.model";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  username: string;
  password: string;
}

export function useLoginUser() {
  const navigate = useNavigate(); // Access the navigate function
  const [loginFormInputs, setLoginFormInputs] = useState<FormInputs>({
    username: "",
    password: "",
  });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { login } = useUserStore();

  const handleLoginFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setLoginFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loadingLogin) {
      return;
    }

    try {
      setLoadingLogin(true);
      const user: IUser = {
        username: loginFormInputs.username,
        password: loginFormInputs.password,
      } as IUser;
      await login(user);
      setLoginFormInputs({
        username: "",
        password: "",
      });
      navigate("/posts");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLogin(false);
    }
  };

  return {
    handleLoginSubmit,
    handleLoginFormChange,
    loginFormInputs,
    loadingLogin,
  };
}

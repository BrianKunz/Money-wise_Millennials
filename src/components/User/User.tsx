import React, { useState } from "react";
import CreateUser from "./CreateUser/createUser";
import LoginUser from "./LoginUser/loginUser";

export const User: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      {isLogin ? <LoginUser /> : <CreateUser />}
      <button onClick={toggleForm}>
        {isLogin ? "Create an account" : "Login"}
      </button>
    </div>
  );
};

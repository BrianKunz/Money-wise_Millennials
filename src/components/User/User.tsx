import React, { useState } from "react";
import CreateUser from "./CreateUser/createUser";
import LoginUser from "./LoginUser/loginUser";
import "./User.scss";

export const User: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="container">
      {isLogin ? <LoginUser /> : <CreateUser />}
      <button onClick={toggleForm}>
        {isLogin ? "Create an account" : "Login"}
      </button>
    </div>
  );
};

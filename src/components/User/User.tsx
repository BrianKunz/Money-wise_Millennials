import React, { useState } from "react";
import CreateUser from "./CreateUser/createUser";
import LoginUser from "./LoginUser/loginUser";
import "./User.scss";

const yourImage = "https://i.imgur.com/hzrwYHK.jpg";

export const User: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="container">
      <img src={yourImage} alt="Login Page Image" />
      {isLogin ? <LoginUser /> : <CreateUser />}
      <button onClick={toggleForm}>
        {isLogin ? "Create an account" : "Login"}
      </button>
    </div>
  );
};

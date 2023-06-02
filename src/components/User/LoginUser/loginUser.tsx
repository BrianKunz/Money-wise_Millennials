import * as React from "react";
import { useLoginUser } from "./useLoginUser";

export default function CreateUser() {
  const { handleLoginSubmit, handleLoginFormChange, loginFormInputs } =
    useLoginUser();

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit} method="POST">
        <div>
          <label>Username</label>
          <input
            id="username"
            type="username"
            name="username"
            value={loginFormInputs.username}
            onChange={handleLoginFormChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={loginFormInputs.password}
            onChange={handleLoginFormChange}
            required
          />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

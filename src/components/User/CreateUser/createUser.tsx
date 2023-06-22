import * as React from "react";
import { useCreateUser } from "./useCreateUser";

export default function CreateUser() {
  const { formInputs, handleFormChange, handleSubmit } = useCreateUser();

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div>
          <label>Username</label>
          <input
            id="username"
            type="username"
            name="username"
            value={formInputs.username}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formInputs.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formInputs.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/">Worksheets</Link>
        </li>
        <li>
          <Link to="/">Quick Tips</Link>
        </li>
        <li>
          <p>Username Here</p>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

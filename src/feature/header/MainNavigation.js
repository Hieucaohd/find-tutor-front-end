import { Link } from "react-router-dom";

import React from "react";

function MainNavigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/parentInfor">Parent Infor</Link>
        </li>
        <li>
          <Link to="/tutorInfor">Tutor Infor</Link>
        </li>
      </ul>
    </div>
  );
}

export default MainNavigation;

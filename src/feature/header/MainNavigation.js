import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  selectToken,
  selectType_tutor,
  selectType_parent,
} from "../auth/authSlice";

import React from "react";

function MainNavigation() {
  const token = useSelector(selectToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {token ? null : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {type_parent ? (
          <li>
            <Link to="/parentInfor">Parent Infor</Link>
          </li>
        ) : (
          <li>
            <button>Toi muon dang ki lam phu huynh</button>
          </li>
        )}

        {type_tutor ? (
          <li>
            <Link to="/tutorInfor">Tutor Infor</Link>
          </li>
        ) : (
          <li>
            <button>Toi muon dang ki lam gia su</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MainNavigation;

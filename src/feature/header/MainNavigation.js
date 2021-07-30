import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './styles.scss'

import {
  selectToken,
  selectType_tutor,
  selectType_parent,
  logout,
} from "../auth/authSlice";

import React from "react";

function MainNavigation() {
  const token = useSelector(selectToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogOut = () => {
    dispatch(logout());
    history.push('/login');
  }

  return (
    <div className="navbar">
      {token && <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

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
        <li>
          <button onClick={() =>handleLogOut()}>Logout</button>
        </li>
      </ul>}
    </div>
  );
}

export default MainNavigation;

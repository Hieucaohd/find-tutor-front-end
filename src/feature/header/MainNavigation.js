import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './styles.scss'

import {
  selectToken,
  selectType_tutor,
  selectType_parent,
  logout,
  selectId_of_user,
} from "../auth/authSlice";

import React from "react";

function MainNavigation() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
  const history = useHistory();
  const userId = useSelector(selectId_of_user);
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
            <Link to={`/parentInfo/${userId}`}>Parent Infor</Link>
          </li>
        ) : (
          <li>
            <button>Toi muon dang ki lam phu huynh</button>
          </li>
        )}

        {type_tutor ? (
          <li>
            <Link to={`/tutorInfo/${userId}`}>Tutor Infor</Link>
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

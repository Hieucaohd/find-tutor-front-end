import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './styles.scss'
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import {
  selectToken,
  selectType_tutor,
  selectType_parent,
  selectId_of_user,
  logout,
  selectRefreshToken,
} from "../auth/authSlice";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import React from "react";

function MainNavigation() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const refresh_token = useSelector(selectRefreshToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
  const history = useHistory();
  const userId = useSelector(selectId_of_user);
  const handleLogOut = () => {
    dispatch(logout({
      token: token,
      refresh_token: refresh_token,
    }));  
    // history.push("/login");
  }
  
  return (
    <div className="navbar">
      {token && <ul>
        <li className = "navbar__home">
        <Link to="/"> <FaHome /> </Link>
        </li>

        <li> 
          <input type="text"/>
          <button> search </button>
        </li>
        {type_parent ? (
          <li className = "navbar__info">
            <Link to={`/parentInfo/${userId}`}>Parent Infor</Link>
          </li>
        ) : null}


        {type_parent ? 
          <li className = "navbar_createroom">  
          <Link to="/createroom"> Create Room </Link>
          </li>
          : null
        }

        {type_tutor ? (
          <li className = "navbar__info">
            <Link to={`/tutorInfo/${userId}`}>Tutor Infor</Link>
          </li>
        ) : null}

        <li className="navbar__signout">
          <button onClick={() =>handleLogOut()}><FaSignOutAlt /></button>
        </li>
      </ul>
    }
    </div>
  );
}

export default MainNavigation;

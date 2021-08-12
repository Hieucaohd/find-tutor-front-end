import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  logout, selectIdParent, selectIdTutor, selectId_of_user, selectRefreshToken, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import './styles.scss';


function MainNavigation() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const refresh_token = useSelector(selectRefreshToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
  const idTutor = useSelector(selectIdTutor);
  const idParent = useSelector(selectIdParent);
  const userId = useSelector(selectId_of_user);
  const history = useHistory();
  const handleLogOut = () => {
    dispatch(logout({
      token: token,
      refresh_token: refresh_token,
    }));  
    history.push("/login");
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

        {type_tutor ? (
          <li className = "navbar__info">
            <Link to={`/tutorprofile/${idTutor}`}>My Profile</Link>
          </li>
        ) : null}

        {type_parent ? (
          <li className = "navbar__info">
            <Link to={`/parentprofile/${idParent}`}>My Profile</Link>
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

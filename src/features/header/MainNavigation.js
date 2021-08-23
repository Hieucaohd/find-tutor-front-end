import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { HiHome, HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  logout, selectIdParent, selectIdTutor, selectId_of_user, selectRefreshToken, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import './styles.scss';
import ToggleMenu from "./components/ToggleMenu"
import { Avatar } from "@material-ui/core";
import { FaUniversity } from "react-icons/fa";
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
    <div>
      {token && <div className="navbar">
        <div className="navbar__item">
          <div>
            <h3 className="navbar__logo">
              LOGO IS HERE
            </h3>
          </div>
          <div className="navbar__section">
            <Link to="/">Home</Link>
          </div>
          <div className="navbar__section">
            {type_tutor && <Link to={`/tutorInfo/${userId}`}>Room</Link>}
            {type_parent && <Link to={`/parentInfo/${userId}`}>Room</Link>}
          </div>
          <div className="navbar__section">
            {type_parent && <Link to="/createroom"> Tạo phòng </Link>}
          </div>
        </div>

        <div className="navbar__item">
          <ToggleMenu onLogOut={handleLogOut}/>
        </div>
      </div>
    }
    </div>
  );
}

export default MainNavigation;

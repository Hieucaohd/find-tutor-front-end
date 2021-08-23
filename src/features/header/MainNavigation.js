import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  logout, selectIdParent, selectIdTutor, selectId_of_user, selectRefreshToken, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import ToggleMenu from "./components/ToggleMenu";

const useStyles = makeStyles({
  root: {
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "height": "56px",
    "background-color": "white",
    "box-shadow": "0 14px 20px -12px rgb(0 0 0 / 20%)",
    "padding": "0px 70px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "z-index": "999",
  },
  item: {
      "display": "flex",
      "align-items": "center",
  },
  section: {
    "height": "40px",
    "display": "flex",
    "align-items": "center",
    "& a" : {
      "color": "#404165",
      "font-size": "14px",
      "font-weight" : "500",
      "text-decoration": "none",
      "border-radius": "12px",
      "padding": "4px 12px",
      "letter-spacing": "0.252291px",
      "&:hover": {
          "cursor": "pointer",
          border: "1px solid #9EA7E6",
          
      }
    } 
  },
  logo: {
    "color": "black",
    "margin": "0px",
    "display": "flex",
    "align-items": "center",
    "font-size": "24px",
    "& svg" : {
      "display": "flex",
      "margin-right": "4px",
    }
  }

})

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
  const classes = useStyles();
  const handleLogOut = () => {
    dispatch(logout({
      token: token,
      refresh_token: refresh_token,
    }));  
    history.push("/login");
  }
  
  return (
    <div>
      {token && <div className={classes.root}>
        <div className={classes.item}>
          <div>
            <h3 className={classes.logo}>
              LOGO IS HERE
            </h3>
          </div>
        </div>

        <div className={classes.item}>
          <div className={classes.section}>
            <Link to="/">Trang Chủ</Link>
          </div>
          <div className={classes.section}>
            {type_tutor && <Link to={`/tutorInfo/${userId}`}>Phòng của bạn</Link>}
            {type_parent && <Link to={`/parentInfo/${userId}`}>Phòng của bạn</Link>}
          </div>
          <div className={classes.section}>
            {type_parent && <Link to="/createroom"> Tạo phòng </Link>}
          </div>
          <ToggleMenu onLogOut={handleLogOut}/>
        </div>
      </div>
    }
    </div>
  );
}

export default MainNavigation;

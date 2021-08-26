import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  logout, selectId_of_user, selectRefreshToken, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import SearchBar from './components/SearchBar';
import ToggleMenu from "./components/ToggleMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "height": "56px",
    "background-color": "white",
    "box-shadow": "0 14px 20px -12px rgb(0 0 0 / 20%)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "z-index": "999",
    [theme.breakpoints.down('sm')]: {
      "padding": "0px 24px",
    },
    [theme.breakpoints.up('md')]: {
      "padding": "0px 70px",
    },
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
      "font-size": "13px",
      "font-weight" : "600",
      "text-decoration": "none",
      "border-radius": "12px",
      "padding": "4px 12px",
      "letter-spacing": "0.252291px",
      "&:hover": {
          "cursor": "pointer",
          border: "1px solid #9EA7E6",
          
      }
    },
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
  logo: {
    "color": "black",
    "margin": "0px",
    marginRight: "12px",
    "display": "flex",
    "align-items": "center",
    "& svg" : {
      "display": "flex",
      "margin-right": "4px",
    },
    [theme.breakpoints.down('sm')]: {
      "font-size": "16px",
    },
    [theme.breakpoints.up('md')]: {
      "font-size": "24px",
    },
  }
}));

function MainNavigation() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const refresh_token = useSelector(selectRefreshToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
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
          <h3 className={classes.logo}>
            LOGO IS HERE
          </h3>
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
        </div>

        <div className={classes.item}>
          <SearchBar />
          <ToggleMenu onLogOut={handleLogOut}/>
        </div>
      </div>
    }
    </div>
  );
}

export default MainNavigation;

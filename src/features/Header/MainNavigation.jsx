import { makeStyles } from '@material-ui/core/styles';
import Search from 'features/Header/components/Search/Search';
import React, { useRef } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  logout, selectId_of_user, selectIsSignedIn, selectRefreshToken, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import MobileNavBar from './components/MobileNavBar/MobileNavBar';
import Notification from './components/Notification/Notification';
import SearchBar from './components/Search/SearchBar';
import ToggleMenu from "./components/ToggleMenu";
import WebBanner from "./components/WebBanner";


function MainNavigation() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const refresh_token = useSelector(selectRefreshToken);
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
  const userId = useSelector(selectId_of_user);
  const history = useHistory();
  const classes = useStyles();
  const searchRef = useRef(null);
  const location = useLocation();
  const isSigned = useSelector(selectIsSignedIn);
  const navigationRef = useRef(null);

  const handleLogOut = async() => {
    dispatch(logout({
      token: token,
      refresh_token: refresh_token,
    }));  
    history.push("/signin");
  }
  const onShowSearchForm = () => {
    if(searchRef.current)
      searchRef.current.style.display = 'flex';
  }
  const onCloseSearchForm = () => {
    if(searchRef.current)
      searchRef.current.style.display = 'none';
  }
  const handleShowLogin = () => {
    history.push("/signin");
  }
  
  return (
    <div>
      {!isSigned && location.pathname === "/" && <WebBanner />}
      {location.pathname !== "/signin" && location.pathname !== "/signup" &&
      <div className={classes.root} ref={navigationRef} 
        style={{
          backgroundColor: isSigned ? "white" : "transparent",
          boxShadow: isSigned ? "0 1px 2px #ccc" : "none",
      }}>
        <div className={classes.item}>
          <Link to="/">
            <h3 className={classes.logo}>
              {/* <img src="https://cdn-icons-png.flaticon.com/512/4634/4634764.png" />
               Tìm gia sư */}
               LOGO IS HERE
            </h3>
          </Link>
          <div className={classes.section}>
            {type_tutor && <Link to={`/tutorInfo/${userId}`}>
              <span><IoPeopleOutline/></span>
              <h4>Phòng của bạn</h4>
              </Link>}
            {type_parent && <Link to={`/parentInfo/${userId}`}>
              <span><IoPeopleOutline/></span>
              <h4>Phòng của bạn</h4>
              </Link>}
          </div>
        </div>
        <div className={classes.item}>
          {isSigned && <SearchBar onShow={onShowSearchForm}/>}
          {isSigned && <Notification />}
          {isSigned && <ToggleMenu onLogOut={handleLogOut} />}
          {!isSigned && <button className={classes.signin} onClick={() => handleShowLogin()}>
            Đăng nhập
          </button>}
        </div>
        
        <div ref={searchRef} style={{display: 'none'}} className={classes.searchForm}>
          <Search onClose={onCloseSearchForm}/>
        </div>
      </div>}
      {isSigned && <div className={classes.navBar}>
        <MobileNavBar userId={userId} typeTutor={type_tutor} typeParent={type_parent}/>
      </div>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "height": 56,
    // backgroundColor: isSignedIn() ? "white" : "transparent",
    // // borderBottom: '1px solid rgba(0,0,0,0.1)',
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "z-index": "700",
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
      "font-weight" : "600",
      "text-decoration": "none",
      
      "letter-spacing": "0.252291px",
      [theme.breakpoints.down('sm')]: {
        "padding": "8px",
        "border-radius": "50%",
        marginRight: '8px',
        "font-size": "16px",
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        "padding": "4px 12px",
        "border-radius": "12px",
        "font-size": "13px",
      },
      "&:hover": {
          "cursor": "pointer",
          border: "1px solid #9EA7E6",
      }, 
      "& h4": {
        margin: 0,
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      "& span": {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
        "& svg": {
          display: 'flex',
        }
      },
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
  },
  blueColor: {
    color: '#5037EC' ,
  },
  searchForm: {
    position: 'fixed',
  },
  signin: {
    backgroundColor: '#5472EA',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    opacity: 0.8,
    marginLeft: "16px",
    "&:hover": {
      opacity: 1,
      cursor: 'pointer',
    }
  },
  navBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
}));

export default MainNavigation;

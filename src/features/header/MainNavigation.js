import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  logout, selectId_of_user, selectRefreshToken, selectToken, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import SearchBar from './components/SearchBar';
import ToggleMenu from "./components/ToggleMenu";
import { IoHomeOutline, IoPeopleOutline, IoAddOutline } from "react-icons/io5";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
const useStyles = makeStyles((theme) => ({
  root: {
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "height": "56px",
    "background-color": "white",
    borderBottom: '1px solid rgba(0,0,0,0.1)',
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
      "font-weight" : "600",
      "text-decoration": "none",
      
      "letter-spacing": "0.252291px",
      [theme.breakpoints.down('sm')]: {
        "padding": "8px",
        "border-radius": "50%",
        marginRight: '8px',
        "font-size": "16px",
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
  home: {
    "height": "40px",
    "display": "flex",
    "align-items": "center",
    "& a" : {
      "color": "#404165",
      "font-weight" : "600",
      "text-decoration": "none",
      
      "letter-spacing": "0.252291px",
      [theme.breakpoints.down('sm')]: {
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
          <Link to="/">
            <h3 className={classes.logo}>
              LOGO IS HERE
            </h3>
          </Link>
          <div className={classes.home}>
            <Link to="/">
              <span> <IoHomeOutline /></span>
              <h4>Trang Chủ</h4>
            </Link>

          </div>
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
          <SearchBar />
          <ToggleMenu onLogOut={handleLogOut}/>
        </div>
      </div>
    }
    </div>
  );
}

export default MainNavigation;

import loadable from '@loadable/component';
import React, { Fragment, useRef } from "react";
import { RiMessage3Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  logout, selectId_of_user, selectIsSignedIn, selectType_parent, selectType_tutor
} from "../auth/authSlice";
import Notification from '../Notification/Notification';
import Search from './components/Search/Search';
import SearchBar from './components/Search/SearchBar';
import ToggleMenu from './components/ToggleMenu';
import "./styles.scss";

const MobileNavBar = loadable(() => import('./components/MobileNavBar/MobileNavBar'))
const WebBanner = loadable(() => import('./components/WebBanner'))

function MainNavigation() {
  const dispatch = useDispatch();
  const type_tutor = useSelector(selectType_tutor);
  const type_parent = useSelector(selectType_parent);
  const userId = useSelector(selectId_of_user);
  const history = useHistory();
  const searchRef = useRef(null);
  const location = useLocation();
  const isSigned = useSelector(selectIsSignedIn);
  const navigationRef = useRef(null);

  const handleLogOut = async() => {
    dispatch(logout());  
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
    <Fragment>
      {!isSigned && location.pathname === "/" && <WebBanner />}
      {location.pathname !== "/signin" && location.pathname !== "/signup" &&
      <div className="navigation" ref={navigationRef} 
        style={{
          backgroundColor: isSigned ? "white" : "transparent",
          borderBottom: isSigned ? "0.5px solid #ccc" : "none",
      }}>
        <div className="navigation__item">
          <Link to="/">
            <h3 className="navigation__logo">
              <img src={require("../../assets/image/tutor.webp").default} alt="gia su"/>
            </h3>
          </Link>
          
          <div className="navigation__section">
            {type_tutor && <Link to={`/tutorInfo/${userId}`}>           
              <h4>Phòng của bạn</h4>
              </Link>}
            {type_parent && <Link to={`/parentInfo/${userId}`}>
              
              <h4>Phòng của bạn</h4>
              </Link>}
          </div>
        </div>
        <div className="navigation__item">
          {isSigned && <SearchBar onShow={onShowSearchForm}/>}
          {isSigned && <Link to="/message" className="navigation__item__mess"> <RiMessage3Fill/></Link>}
          {isSigned && <Notification />}
          {isSigned && <ToggleMenu onLogOut={handleLogOut} />}
          {!isSigned && <button className="navigation__signin" onClick={() => handleShowLogin()}>
            Đăng nhập
          </button>}
        </div>
        
        <div ref={searchRef} style={{display: 'none'}} className="navigation__search">
          <Search onClose={onCloseSearchForm}/>
        </div>
      </div>}
      {isSigned && <div className="navigation__bottom">
        <MobileNavBar userId={userId} typeTutor={type_tutor} typeParent={type_parent}/>
      </div>}
    </Fragment>
  );
}

export default MainNavigation;

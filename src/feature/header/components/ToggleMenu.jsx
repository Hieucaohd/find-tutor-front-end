import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIdParent, selectIdTutor, selectType_parent, selectType_tutor } from '../../auth/authSlice';
import { useEffect } from 'react';
import { getParentProfile, getTutorProfile } from '../../profile/profile';
import { Avatar } from '@material-ui/core';
import "./styles.scss";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
ToggleMenu.propTypes = {
    onLogOut: PropTypes.func.isRequired,
};

function ToggleMenu( {onLogOut} ) {
    const typeTutor = useSelector(selectType_tutor);
    const typeParent = useSelector(selectType_parent);
    const tutorId = useSelector(selectIdTutor);
    const parentId = useSelector(selectIdParent)
    const [profile, setProfile] = useState({});
    const dropDownRef = useRef(null);
    const overlayRef = useRef(null);
    useEffect( () => {
        const getUserInfo = async () => {
            let userInfo = {};
            if(typeTutor) {
                userInfo = await getTutorProfile({id: tutorId});
            } else if (typeParent) {
                userInfo = await getParentProfile({id: parentId});
            }
            setProfile({
                avatar: "https://laptrinhcuocsong.com/images/lap-trinh-vien.png",
                userName: userInfo.user,
            })
        }
        getUserInfo();
    }, []);
    const handleLogout = () => {
        onLogOut();
    }
    const handleShowDropDown = () => {
        dropDownRef.current.style.display = "block";
        overlayRef.current.style.display = "block";
    }
    const handleDontShowDropDown = () => {
        dropDownRef.current.style.display = "none";
        overlayRef.current.style.display = "none";
    }
    return (
        <div>
          {typeParent || typeTutor 
          ? <div className="toggle"> 
                <div className="toggle__user" onClick={handleShowDropDown}>
                    <span className="toggle__line"></span>
                    <BsFillCaretDownFill />
                    {profile.userName}
                    <Avatar src={profile.avatar}/>
                </div>
                <div class="toggle__dropdown" onClick={handleDontShowDropDown} ref={dropDownRef}>
                    {typeTutor && <Link to={`/tutorprofile/${tutorId}`}>My Profile</Link>}
                    {typeParent && <Link to={`/parentprofile/${parentId}`}>My Profile</Link>}
                    <a href="/login" onClick={handleLogout}>Đăng xuất</a>
                </div>
            </div>
            :<div onClick={handleLogout}> Log Out </div>
            }
            <div className="toggle__overlay" ref={overlayRef} onClick={handleDontShowDropDown}></div>
        </div>
    );
}

export default ToggleMenu;
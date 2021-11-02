import { Avatar } from '@material-ui/core';
import { getUserNameAndAvatar } from 'graphql/ProfileQueries';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BsFillCaretDownFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectId_of_user, selectType_parent, selectType_tutor } from '../../auth/authSlice';

ToggleMenu.propTypes = {
    onLogOut: PropTypes.func.isRequired,
};

function ToggleMenu( {onLogOut} ) {
    const typeTutor = useSelector(selectType_tutor);
    const typeParent = useSelector(selectType_parent);
    const userId = useSelector(selectId_of_user);
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isShowDropDown, setIsShowDropDown] = useState(false);
    
    useEffect( () => {
        const getUserInfo = async () => {
            const userInfo = await getUserNameAndAvatar(userId)            
            setProfile({
                avatar: userInfo?.imageprivateusermodel?.avatar,
                userName: userInfo?.username,
            })
        }
        getUserInfo();
    }, [userId]);

    const handleLogout = () => {
        onLogOut();
    }

    const handleShowDropDown = () => {
        setIsShowDropDown(!isShowDropDown);
        setIsLoading(!isLoading);
    }

    return (
        <div>
          {typeParent || typeTutor 
          ? <div className="navigation__toggle"> 
                <div className="navigation__toggle__user" onClick={handleShowDropDown}>
                    <BsFillCaretDownFill />
                    <h4>{profile.userName}</h4>
                    <Avatar src={profile.avatar || null}/>
                </div> 
                    {isShowDropDown && <div className="navigation__toggle__dropdown" onClick={handleShowDropDown}>
                    {typeParent && <Link to={'/createroom'}>Tạo phòng</Link>}
                    {typeTutor && <Link to={`/profile/tutor/${userId}`}>Thông tin gia sư</Link>}
                    {typeParent && <Link to={`/profile/parent/${userId}`}>Thông tin phụ huynh</Link>}
                    {(typeTutor || typeParent) && <Link to={`/settings/account`}>Cài đặt tài khoản</Link>}
                    <Link to={"/signin"} onClick={handleLogout}>Đăng xuất</Link>
                </div>}
            </div>

            :<Link to={"/signin"} onClick={handleLogout}> Đăng xuất </Link>
            }
            {isLoading && <div className="navigation__toggle__overlay" onClick={handleShowDropDown}></div>}
        </div>
    );
}


export default ToggleMenu;
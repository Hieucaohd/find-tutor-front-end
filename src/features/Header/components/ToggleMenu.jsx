import { Avatar } from '@material-ui/core';
import { getAvatar } from 'graphql/ProfileQueries';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAvatar, selectId_of_user, selectType_parent, selectType_tutor, selectUsername, setAvatar } from '../../auth/authSlice';

function ToggleMenu( {onLogOut} ) {
    const typeTutor = useSelector(selectType_tutor);
    const typeParent = useSelector(selectType_parent);
    const userId = useSelector(selectId_of_user);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowDropDown, setIsShowDropDown] = useState(false);
    const userAvatar = useSelector(selectAvatar);
    const userName = useSelector(selectUsername);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserAvatar = async () => {
            const avatar = await getAvatar(userId);
            dispatch(setAvatar(avatar?.imageprivateusermodel?.avatar));
        }
        if(userId) {
            getUserAvatar();
        }
    }, [userId, dispatch])

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
                    <h4>{userName}</h4>
                    <Avatar src={userAvatar || null}/>
                </div> 
                    {isShowDropDown && <div className="navigation__toggle__dropdown" onClick={handleShowDropDown}>                  
                    {typeTutor && <Link to={`/tutorInfo/${userId}`}> Phòng của bạn</Link>}
                    {typeParent && <Link to={`/parentInfo/${userId}`}>Phòng của bạn</Link>}
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
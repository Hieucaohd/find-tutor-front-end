import React from 'react';
import { AiFillHome, AiFillLayout } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import "./styles.scss";

function MobileNavBar({userId, typeTutor, typeParent}) {
    
    return (
        <div className="navbar">
            <NavLink exact to="/">
                <AiFillHome />
                Trang Chủ
            </NavLink>
            {typeTutor && <NavLink to={`/tutorInfo/${userId}`}>
                <AiFillLayout />
                Phòng Của Bạn
            </NavLink>}
            {typeParent && <NavLink to={`/parentInfo/${userId}`}>
                <AiFillLayout />
                Phòng Của Bạn
            </NavLink>}
        </div>
    );
}


export default MobileNavBar;
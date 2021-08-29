import { Avatar, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillCaretDownFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIdParent, selectIdTutor, selectType_parent, selectType_tutor } from '../../auth/authSlice';
import { getParentProfile, getTutorProfile } from '../../profile/profile';

ToggleMenu.propTypes = {
    onLogOut: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        display: "inline-block",
    },
    user: {
        display: "flex",
        alignItems: "center",
        color: "#404165",
        fontSize: "12px",
        fontWeight: "500",
        "& svg": {
            marginRight: "4px",
        },
        "& > div": {
            marginLeft: "8px",
            width: "36px",
            height: "36px",
        },
        "&:hover": {
            cursor: "pointer",
            opacity: "0.6",
        },
        "& h4": {
            margin: 0,
            [theme.breakpoints.down('sm')]: {
                "&": {
                    display: 'none',
                }
            },
        }, 
    },
    line: {
        width: "1px",
        height: "28px",
        backgroundColor: "#ccc",
        marginRight: "12px",
        marginLeft: "8px",
        opacity: "0.6",
        borderRadius: "20%",
    },
    dropdown: {
        marginTop: "11px",
        display: "none",
        position: "absolute",
        right: "4px",
        backgroundColor: "#f9f9f9",
        minWidth: "120px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        "z-index": "1001",
        borderRadius: "4px",
        "& > a": {
            color: "black",
            padding: '8px 12px',
            fontWeight: '400',
            fontSize: '14px',
            textDecoration: "none",
            display: "block",
            borderRadius: "4px",
            "&:hover": {
                color: "#ADB5E8",
            }
        }
    },
    overlay: {
        display: "none",
        position: "fixed",
        top: "40px",
        left: "0px",
        bottom: "0px",
        right: "0px",
        background:"rgba(0,0,0,0)",
        "z-index": "100",
    }
}));

function ToggleMenu( {onLogOut} ) {
    const classes = useStyles();
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
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5MNUpULlmtF1LYUWip59zHNtKmkxxhstvg&usqp=CAU",
                userName: userInfo.user,
            })
        }
        getUserInfo();
    }, []);
    const handleLogout = () => {
        onLogOut();
    }
    const handleShowDropDown = () => {
        if(dropDownRef.current.style.display === "none"){
            dropDownRef.current.style.display = "block";
            overlayRef.current.style.display = "block";
        } else {
            handleDontShowDropDown();
        }
    }
    const handleDontShowDropDown = () => {
        dropDownRef.current.style.display = "none";
        overlayRef.current.style.display = "none";
    }
    return (
        <div>
          {typeParent || typeTutor 
          ? <div className={classes.root}> 
                <div className={classes.user} onClick={handleShowDropDown}>
                    <span className={classes.line}></span>
                    <BsFillCaretDownFill />
                    <h4>{profile.userName}</h4>
                    <Avatar src={profile.avatar}/>
                </div>
                <div class={classes.dropdown} onClick={handleDontShowDropDown} ref={dropDownRef}>
                    {typeTutor && <Link to={`/tutorprofile/${tutorId}`}>My Profile</Link>}
                    {typeParent && <Link to={`/parentprofile/${parentId}`}>My Profile</Link>}
                    <a href="/login" onClick={handleLogout}>Đăng xuất</a>
                </div>
            </div>
            :<div onClick={handleLogout}> Log Out </div>
            }
            <div className={classes.overlay} ref={overlayRef} onClick={handleDontShowDropDown}></div>
        </div>
    );
}

export default ToggleMenu;
import { Avatar, makeStyles } from '@material-ui/core';
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
    const classes = useStyles();
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
          ? <div className={classes.root}> 
                <div className={classes.user} onClick={handleShowDropDown}>
                    <BsFillCaretDownFill />
                    <h4>{profile.userName}</h4>
                    <Avatar src={profile.avatar || null}/>
                </div> 
                    {isShowDropDown && <div className={classes.dropdown} onClick={handleShowDropDown}>
                    {typeParent && <Link to={'/createroom'}>Tạo phòng</Link>}
                    {typeTutor && <Link to={`/profile/tutor/${userId}`}>Thông tin gia sư</Link>}
                    {typeParent && <Link to={`/profile/parent/${userId}`}>Thông tin phụ huynh</Link>}
                    {(typeTutor || typeParent) && <Link to={`/settings/account`}>Cài đặt tài khoản</Link>}
                    <Link to={"/signin"} onClick={handleLogout}>Đăng xuất</Link>
                </div>}
            </div>

            :<Link to={"/signin"} onClick={handleLogout}> Đăng xuất </Link>
            }
            {isLoading && <div className={classes.overlay} onClick={handleShowDropDown}></div>}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        display: "inline-block",
    },
    user: {
        display: "flex",
        alignItems: "center",
        color: "#797575",
        fontSize: "12px",
        fontWeight: "500",
        // backgroundColor: '#c9dcfb',
        borderLeft: "1px solid #ccc",
        padding: '0px 0px',
        paddingLeft: '12px',
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
            opacity: 0.8,
        },
        "& h4": {
            margin: 0,
            [theme.breakpoints.down('xs')]: {
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
        marginTop: "4px",
        position: "absolute",
        [theme.breakpoints.down('xs')]: {
            right: "-12px",
          },
          [theme.breakpoints.up('sm')]: {
            right: "4px",
          },
        backgroundColor: "#f9f9f9",
        minWidth: "160px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        "z-index": "1001",
        borderRadius: "4px",
        overflow: "hidden",
        "& > a": {
            color: "black",
            padding: '8px 12px',
            fontWeight: '400',
            fontSize: '14px',
            textDecoration: "none",
            display: "block",
            
            "&:hover": {
                color: '#fff',
                backgroundColor: '#0095FF',
            }
        }
    },
    overlay: {
        position: "fixed",
        top: "40px",
        left: "0px",
        bottom: "0px",
        right: "0px",
        background:"rgba(0,0,0,0)",
        "z-index": "100",
    }
}));

export default ToggleMenu;
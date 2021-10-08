import { makeStyles } from '@material-ui/core/styles';
import { selectToken } from 'features/auth/authSlice';
import { notification_socket } from 'namespace';
import React, { useEffect, useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import { useSelector } from 'react-redux';

function Notification({typeTutor, typeParent}) {
    const classes = useStyles();
    
    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <div className={classes.root}>
            <IoNotifications onClick={() => setShowDropDown(!showDropDown)}/>
            {showDropDown && <ul className={classes.dropdown}>
                <li>abc vừa thêm bạn</li>
                <li>abc vừa thêm bạn</li>
                <li>abc vừa thêm bạn</li>
                <li>abc vừa thêm bạn</li>
                
                
            </ul>}
            {showDropDown && <div className={classes.overlay} onClick={() => setShowDropDown(false)}></div>}
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        fontSize: 20,
        margin: "0 12px",
        position: 'relative',
        "& svg": {
            color: "#797575",
            "&:hover": {
                color: "#5472EA",
                cursor: "pointer",
            }
        }
    },
    dropdown: {
        position: 'absolute',
        top: 32,
        right: -100,
        margin: 0,
        minWidth: 200,
        padding: 0,
        backgroundColor: 'white',
        boxShadow: "0px 4px 8px 0px rgb(0 0 0 / 20%)",
        borderRadius: 8,
        "& li": {
            padding: 8,
            fontSize: 16,
            listStyleType: 'none',
        },
        "z-index": "101",
        
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
})

export default Notification;
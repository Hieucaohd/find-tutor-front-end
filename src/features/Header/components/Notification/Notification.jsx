import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import NotificationList from './components/NotificationList';
import "./styles.scss";

function Notification({typeTutor, typeParent}) {
    const classes = useStyles();
    
    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <div className={classes.root}>
            <IoNotifications onClick={() => setShowDropDown(!showDropDown)}/>
            {showDropDown && <NotificationList />}
            {showDropDown && <div className={classes.overlay} onClick={() => setShowDropDown(false)}></div>}
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        fontSize: 20,
        marginRight: 8,
        marginLeft: 4,
        position: 'relative',
        "& svg": {
            color: "#797575",
            padding: 8,
            borderRadius: "50%",
            "&:hover": {
                // color: "#5472EA",
                backgroundColor: "#F0F0F0",
                cursor: "pointer",
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
})

export default Notification;
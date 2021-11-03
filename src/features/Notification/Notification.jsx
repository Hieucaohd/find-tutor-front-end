import { makeStyles } from '@material-ui/core/styles';
import notificationMP3 from "assets/sounds/notification.mp3";
import { selectIsSignedIn } from 'features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { notification_socket } from "../../namespace";
import NotificationList from './components/NotificationList';
import "./styles.scss";

function Notification(props) {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
        setCount(count => count + 1);
    };
    const isSigned = useSelector(selectIsSignedIn);
    const playNotificationSound = () => {
        let notificationSound = new Audio (notificationMP3);
        notificationSound.play();
    }
    
    useEffect(() => {
        if(!isSigned) return;
        
        // let ws = new WebSocket(notification_socket, ["Token", token]);
        let ws = new WebSocket(notification_socket);
        ws.onopen = () => console.log('Notification Websocket opened');
        ws.onclose = () => console.log('Notification Websocket closed');
        
        ws.onmessage = e => {
            handleIncrement();
            playNotificationSound();
        }
        // setTimeout(() => {
        //     ws.close();
        // }, [10000])
    
        return () => {
            ws.close();
        }
        
    }, [isSigned])

    useEffect(() => {
        if(count > 0) {
            document.title = `(${count}) Tìm gia sư uy tín miễn phí`
        } else {
            document.title = `Tìm gia sư uy tín miễn phí`;
        }
    }, [count])

    const handleShowNotificationBar = () => {
        setShowDropDown(!showDropDown);
        setCount(0);
    }

    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <div className={classes.root}>
            <div className={classes.notiIcon}>
                <IoNotifications onClick={() => handleShowNotificationBar() } />
                { count > 0 && <div className={classes.dot}></div>}
            </div>
            {showDropDown && <NotificationList onClose={() => setShowDropDown(false)}/>}
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
    notiIcon: {
        display: 'flex',
        position: 'relative',
        fontSize: 35,
    },
    dot: {
        width: 7,
        height: 7,
        backgroundColor: '#F02849',
        position: 'absolute',
        borderRadius: "50%",
        top: 8,
        right: 8,
        border: "1.5px solid #fff",
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
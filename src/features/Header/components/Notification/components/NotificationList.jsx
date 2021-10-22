import { selectToken } from 'features/auth/authSlice';
import { getNotification } from 'graphql/ProfileQueries';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RoomNotification from './RoomNotification';

function NotificationList(props) {
    const [notiList, setNotiList] = useState([]);
    const token = useSelector(selectToken)
    useEffect(() => {
        const getNotiList = async () => {
            const list = await getNotification(token);
            setNotiList(list);
        }
        getNotiList();
    }, [token]) 

    console.log(notiList);

    return (
        <div className="noti__list">
            <h5 > Thông báo </h5>
            <ul >
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                <li><RoomNotification /></li>
                
            </ul>
        </div>
        
    );
}

export default NotificationList;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectId_of_user, selectToken } from '../auth/authSlice';
import { selectRoomList } from '../home/homeSlice';
import RoomCreated from './components/RoomCreated';

function ParentInfor() {
    const roomList = useSelector(selectRoomList);
    const token = useSelector(selectToken);
    const parentId = useSelector(selectId_of_user);
    const parentRoomList = roomList.filter( (room) => room.parent === parentId);
    const [isRenderCreateRoom, setIsRenderCreateRoom] = useState(false);
    
    const showFormCreateRoom = () => {
        setIsRenderCreateRoom(true);
    }
    const closeFormCreateRoom = () => {
        setIsRenderCreateRoom(false);
    }

    return (
        <div>
            <h4>Parent Id: {parentId}</h4>
            <ul>
            {parentRoomList.map( (room) => (
                <RoomCreated room = {room} token = {token}  parentid = {parentId} />
            ))}
            </ul>
        </div>
    )
}

export default ParentInfor

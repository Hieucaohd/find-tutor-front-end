import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectId_of_user, selectToken } from '../auth/authSlice';
import Room from '../components/Room/Room';
import { fetchRoomList } from '../home/getRoom';
import "./styles.scss";
import { deleteRoom } from "../home/homeSlice";

function ParentInfor() {
    const token = useSelector(selectToken);
    const parentId = useSelector(selectId_of_user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [parentRoomList, setParentRoomList] = useState([]);
    if(!token) {
        history.push("/login")
    }
    const handleDeleteRoom = (roomId) => {
        dispatch(deleteRoom({ roomId: roomId, token: token }));
    }
    useEffect ( ()=> {
        const getList = async () => {
            const roomList = await fetchRoomList();
            const parentRooms = await roomList.filter( (room) => room.parent === Number(parentId));;
            setParentRoomList(parentRooms);
        }
        getList();
    }, [])
    return (
        <Grid container spacing={2} className="parentinfo">
            {parentRoomList.map( (room)=> (
                <Room room={room} onDelete={handleDeleteRoom} color={"#7FDBCA"}/>
            ))}
        </Grid>
    )
}

export default ParentInfor

import { Grid, makeStyles } from '@material-ui/core';
import Room from 'components/Room/Room.jsx';
import { GetAllRoom } from 'graphql/HomeQueries';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectId_of_user, selectToken } from '../auth/authSlice';
import { deleteRoom } from './parent';

const useStyles = makeStyles({
    root: {
        padding: "40px",
    }
})

function ParentInfor() {
    const classes = useStyles();
    const token = useSelector(selectToken);
    const parentId = useSelector(selectId_of_user);
    const [parentRoomList, setParentRoomList] = useState([]);
    const handleDeleteRoom = async (roomId) => {
        let newParentRoomList = [...parentRoomList];
        newParentRoomList = await newParentRoomList.filter( (room) => Number(room.id) !== Number(roomId));
        setParentRoomList(newParentRoomList);
        await deleteRoom({ roomId: roomId, token: token });
    }
    
    useEffect ( ()=> {
        const getList = async () => {
            const roomList = await GetAllRoom();
            const parentRooms = await roomList.filter( (room) => room.parent === Number(parentId));
            setParentRoomList(parentRooms);
        }
        getList();
    }, [])
    return (
        <Grid container spacing={2} className={classes.root}>
            {parentRoomList.map( (room)=> (
                <Room room={room} onDelete={handleDeleteRoom} color={"#7FDBCA"}/>
            ))}
        </Grid>
    )
}

export default ParentInfor
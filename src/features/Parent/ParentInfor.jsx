import { Grid, makeStyles } from '@material-ui/core';
import Room from 'components/Room/Room.jsx';
import { isSignedIn } from 'features/auth/cookies';
import { GetAllParentRoom, GetAllRoom, GetUserParentRoom } from 'graphql/RoomQueries';
import React, { useEffect, useState } from 'react';
import { FcAddDatabase } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectId_of_user, selectToken, selectType_parent } from '../auth/authSlice';
import { deleteRoom } from './parent';

function ParentInfor() {
    const classes = useStyles();
    const token = useSelector(selectToken);
    const parentId = useSelector(selectId_of_user);
    const typeParent = useSelector(selectType_parent);
    const history = useHistory();
    const [parentRoomList, setParentRoomList] = useState([]);

    const handleDeleteRoom = async (roomId) => {
        let newParentRoomList = [...parentRoomList];
        newParentRoomList = await newParentRoomList.filter( (room) => room.id != roomId);
        setParentRoomList(newParentRoomList);
        await deleteRoom({ roomId: roomId, token: token });
    }
    
    useEffect ( ()=> {
        const getList = async () => {
            const parentRooms = await GetAllParentRoom(parentId);
            setParentRoomList(parentRooms);
        }
        getList();
    }, [])

    const handleShowCreateRoom = () => {
        history.push("/createroom");
    };

    return (
        <div>
            {isSignedIn() && typeParent && <button onClick={handleShowCreateRoom} className={classes.addRoom}><FcAddDatabase /></button>}
            <Grid container spacing={2} className={classes.root}>
                {parentRoomList.map( (room)=> (
                    <Room room={room} onDelete={handleDeleteRoom} color={"#7FDBCA"}/>
                ))}
            </Grid>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        marginTop: '28px',
        padding: "40px",
    },
    addRoom: {
        position: 'fixed',
        top: '40%',
        left: '16px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '32px',
        "&:hover": {
            cursor: 'pointer',
        }
    }
})

export default ParentInfor
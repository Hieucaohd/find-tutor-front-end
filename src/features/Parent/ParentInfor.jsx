import { Grid, makeStyles } from '@material-ui/core';
import Modal from 'components/Modal/Modal';
import Room from 'components/Room/Room.jsx';
import { isSignedIn } from 'features/auth/cookies';
import { GetAllParentRoom } from 'graphql/RoomQueries';
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
    const [alertModal, setAlertModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleDeleteRoom = async () => {
        let newParentRoomList = [...parentRoomList];
        newParentRoomList = await newParentRoomList.filter( (room) => Number(room.id) !== Number(currentId));
        setParentRoomList(newParentRoomList);
        await deleteRoom({ roomId: currentId, token: token });
        setAlertModal(false);
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

    const handleShowAlertBox = (id) => {
        setCurrentId(id);
        setAlertModal(true);
    }   

    return (
        <div>
            {isSignedIn() && typeParent && <button onClick={handleShowCreateRoom} className={classes.addRoom}><FcAddDatabase /></button>}
            <Grid container className={classes.root}>
                {parentRoomList?.map( (room)=> (
                    <Room room={{...room, roomId: room.id}} type="userroom" onDelete={handleShowAlertBox}/>
                ))}
            </Grid>
            {alertModal && <Modal typeIcon="delete" text="Xóa phòng học này" onAgree={() => handleDeleteRoom()} />}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        marginTop: '28px',
        padding: "52px",
    },
    addRoom: {
        position: 'fixed',
        top: '40%',
        left: '8px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '32px',
        "&:hover": {
            cursor: 'pointer',
        }
    }
})

export default ParentInfor
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addInvitedListForRoom } from '../../../invitedListForRoomSlice';
import { deleteWaitingListForRoom } from '../../../waitingListForRoomSlice';
import TutorItem from './TutorItem';

WaitingList.propTypes = {
    waitingList: PropTypes.array,
    parentId: PropTypes.number,
    userId: PropTypes.number,
    typeParent: PropTypes.bool,
    roomId: PropTypes.number,
    token: PropTypes.string,
};

const useStyles = makeStyles({
    root: {
        padding: "0px 8px",
        "& li": {
            "list-style-type": "none",
        }
    },
})

function WaitingList( props ) {
    const {waitingList = [], parentId, roomId, userId, token = "", typeParent = false} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const deleteFromWaitingList = (waitingId) => {
        if(!waitingId) return;
        dispatch(deleteWaitingListForRoom({
            waitingId: waitingId,
            roomId: roomId,
            token: token,
        }));
    };

    const addToInvitedList = (waitingId) => {
        if(!waitingId) return;
        dispatch(addInvitedListForRoom({ waitingId: waitingId, token: token }));
    };
    return (
        <ul className={classes.root}>
            {waitingList.map( (waiting) => (
                 <li key = {waiting.id}> 
                    <TutorItem 
                        id = {waiting.id}
                        tutorId = {waiting.tutor} 
                        onCheck={typeParent && Number(parentId) === Number(userId) ? addToInvitedList : null}
                        onDelete={typeParent && Number(parentId) === Number(userId) ? deleteFromWaitingList : null}
                    />
                </li>
            ))}
        </ul>
    );
}

export default WaitingList;
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteInvitedListForRoom } from '../../../invitedListForRoomSlice';
import { addTryTeachingForRoom } from '../../../tryTeachingForRoomSlice';
import TutorItem from './TutorItem';

InvitedList.propTypes = {
    invitedList: PropTypes.array,
    userId: PropTypes.number,
    typeTutor: PropTypes.bool,
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

function InvitedList( props ) {
    const {invitedList = [], userId, token = "", typeTutor = false} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const deleteFromInvitedList = (invitedId) => {
        dispatch(deleteInvitedListForRoom({ invitedId: invitedId, token: token }));
    };
    
    const addToTryTeaching = (invitedId) => {
        dispatch(
          addTryTeachingForRoom({
            invitedId: invitedId,
            token: token,
          })
        );
      };
    return (
        <ul className={classes.root}>
            {invitedList.map( (invited) => (
                 <li key = {invited.id}>
                    <TutorItem
                        id = {invited.id}
                        tutorId = {invited.tutor} 
                        onCheck={typeTutor && Number(userId) === Number(invited.tutor) ? addToTryTeaching : null}
                        onDelete={typeTutor && Number(userId) === Number(invited.tutor) ? deleteFromInvitedList : null}
                    />
                </li>
            ))}
        </ul>
    );
}

export default InvitedList;
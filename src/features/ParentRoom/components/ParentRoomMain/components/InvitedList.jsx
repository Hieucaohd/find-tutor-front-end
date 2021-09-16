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
        margin: "8px 0",
        "& li": {
            "list-style-type": "none",
        }
    },
})

function InvitedList( props ) {
    const {invitedList = [], userId, token = "", typeTutor = false} = props;
    console.log('danh sach moi', invitedList);
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
                        tutor = {invited.tutor} 
                        onCheck={typeTutor && Number(invited.tutor.user.id) === Number(userId) ? addToTryTeaching : null}
                        onDelete={typeTutor && Number(invited.tutor.user.id) === Number(userId) ? deleteFromInvitedList : null}
                    />
                </li>
            ))}
        </ul>
    );
}

export default InvitedList;
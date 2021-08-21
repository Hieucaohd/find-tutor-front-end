import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToTeachingForRoom } from '../../../teachingForRoomSlice';
import { deleteTryTeachingForRoom } from '../../../tryTeachingForRoomSlice';
import { makeStyles } from '@material-ui/core';
import TutorItem from './TutorItem';

TryTeachingList.propTypes = {
    tryTeachingList: PropTypes.array,
    userId: PropTypes.number,
    token: PropTypes.string,
    typeTutor: PropTypes.bool,
    typeParent: PropTypes.bool,
};

const useStyles = makeStyles({
    root: {
        padding: "0px 8px",
        "& li": {
            "list-style-type": "none",
        }
    },
})

function TryTeachingList(props) {
    const {tryTeachingList = [], userId, token = "", typeTutor = false, typeParent = false} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const addToTeaching = (try_teachingId) => {
        addToTeachingForRoom({
          try_teachingId: try_teachingId,
          token: token,
          dispatch: dispatch,
        });
    };

    const deleteFromTryTeaching = (try_teachingId) => {
        dispatch(
          deleteTryTeachingForRoom({ try_teachingId: try_teachingId, token: token })
        );
    };

    return (
        <ul className={classes.root}>
            {tryTeachingList.map( (tryTeaching) => (
                 <li key = {tryTeaching.id}>
                    <TutorItem
                        id = {tryTeaching.id}
                        tutorId = {tryTeaching.tutor} 
                        onCheck={Number(userId) === Number(tryTeaching.parent_room) || Number(userId) === Number(tryTeaching.tutor)
                             ? addToTeaching : null}
                        onDelete={Number(userId) === Number(tryTeaching.parent_room) || Number(userId) === Number(tryTeaching.tutor)
                             ? deleteFromTryTeaching : null}
                        onWait = {typeParent && tryTeaching.parent_agree || typeTutor && tryTeaching.tutor_agree}
                        />
                </li>
            ))}
        </ul>
    );
}

export default TryTeachingList;
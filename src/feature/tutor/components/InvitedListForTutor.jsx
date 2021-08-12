import React from 'react';
import PropTypes from 'prop-types';

InvitedListForTutor.propTypes = {
    invitedList: PropTypes.array,
    onTryTeach: PropTypes.func,
    onDelete: PropTypes.func,
};

InvitedListForTutor.defaultProps = {
    invitedList: [],
    onTryTeach: null,
    onDelete: null,
}

function InvitedListForTutor( props ) {
    const {invitedList, onTryTeach, onDelete} = props;

    const handleTryTeach = (invitedId) => {
        if(!onTryTeach) return;
        onTryTeach(invitedId);
    }

    const handleDontTryTeach = (invitedId) => {
        if(!onDelete) return;
        onDelete(invitedId);
    }

    return (
        <ul>
            {invitedList.map( (invited)=> (
                <li key={invited.id}>
                    id: {invited.id}, parent_room: {invited.parent_room}
                    <button onClick={() => handleTryTeach(invited.id)}>
                    Dong y day thu
                    </button>
                    <button onClick={() => handleDontTryTeach(invited.id)}>
                    Khong dong y day thu
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default InvitedListForTutor;
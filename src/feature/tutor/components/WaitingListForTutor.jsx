import React from 'react';
import PropTypes from 'prop-types';

WaitingListForTutor.propTypes = {
    waitingList: PropTypes.array,
    onDelete: PropTypes.func,
};

WaitingListForTutor.defaultProps = {
    waitingList: [],
    onDelete: null
}

function WaitingListForTutor( {waitingList, onDelete} ) {
    console.log('waiting list ', waitingList)
    const handleDeleteWaiting = (waitingId) => {
        if(!onDelete) return;
        onDelete(waitingId)
    }

    
    return (
        <ul>
            {waitingList.map( (waiting) => (
                <li key={waiting.id}>
                    id: {waiting.id}, parent_room: {waiting.parent_room}
                    <button onClick={() => handleDeleteWaiting(waiting.id)}>
                     delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default WaitingListForTutor;
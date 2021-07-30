import React from 'react';
import PropTypes from 'prop-types';

TeachingListForTutor.propTypes = {
    teachingList: PropTypes.array,
};

TeachingListForTutor.defaultProps = {
    teachingList: [],
}

function TeachingListForTutor( {teachingList} ) {
    
    return (
        <ul>
            {teachingList.map( (teach) => (
                <li key={teach.id}>
                id: {teach.id}, parent_room: {teach.parent_room}
                </li>
            ))}
        </ul>
    );
}

export default TeachingListForTutor;
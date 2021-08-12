import React from 'react';
import PropTypes from 'prop-types';

TryTeachingListForTutor.propTypes = {
    tryTeachingList: PropTypes.array,
    onTeach: PropTypes.func,
    onDelete: PropTypes.func,
};

TryTeachingListForTutor.defaultProps = {
    tryTeachingList: [],
    onTeach: null,
    onDelete: null,
}

function TryTeachingListForTutor(props) {
    const {tryTeachingList, onTeach, onDelete} = props;

    const handleTeach = (tryTeachingId) => {
        if(!onTeach) return;
        onTeach(tryTeachingId);
    }

    const handleDontTeach = (tryTeachingId) => {
        if(!onDelete) return;
        onDelete(tryTeachingId);
    }

    return (
        <ul>
            {tryTeachingList.map( (tryTeaching) => (
                <li key={tryTeaching.id}>
                id: {tryTeaching.id}, parent_room: {tryTeaching.parent_room}
                {!tryTeaching.tutor_agree ? (
                <button onClick={() => handleTeach(tryTeaching.id)}>
                    Đồng ý dạy chính thức
                </button>
                ) : (
                <button>Chờ phụ huynh đồng ý</button>
                 )}
                <button onClick={() => handleDontTeach(tryTeaching.id)}>
                    Khong muon day tiep
                </button>
            </li>
            ))}
        </ul>
    );
}

export default TryTeachingListForTutor;
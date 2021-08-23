import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Room from 'components/Room/Room';

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
        <Grid container spacing={2}>
            {tryTeachingList.map( (tryTeaching) => (
                <Room room={tryTeaching} onDelete={handleDontTeach} onCheck={handleTeach} onWait={tryTeaching.tutor_agree} color={"#4285F4"}/>
            ))}
        </Grid>
    );
}

export default TryTeachingListForTutor;
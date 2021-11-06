import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Room from 'components/Room/RoomContainer';

TeachingListForTutor.propTypes = {
    teachingList: PropTypes.array,
};

TeachingListForTutor.defaultProps = {
    teachingList: [],
}

function TeachingListForTutor( {teachingList} ) {
    
    return (
        <Grid container spacing={2}>
            {teachingList.map( (teach) => (
                <Room room={teach} color={"red"}/>
            ))}
        </Grid>
    );
}

export default TeachingListForTutor;
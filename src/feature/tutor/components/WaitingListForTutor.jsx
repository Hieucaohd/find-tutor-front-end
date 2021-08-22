import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Room from '../../components/Room/Room';

WaitingListForTutor.propTypes = {
    waitingList: PropTypes.array,
    onDelete: PropTypes.func,
};

WaitingListForTutor.defaultProps = {
    waitingList: [],
    onDelete: null
}

function WaitingListForTutor( {waitingList, onDelete} ) {
    const handleDeleteWaiting = (waitingId) => {
        if(!onDelete) return;
        onDelete(waitingId)
    }
    console.log(waitingList)
    return (
        <Grid container spacing={2}>
            {waitingList.map( (waiting) => (
                <Room room={waiting} onDelete={handleDeleteWaiting} color={"#FFE7C4"}/>
            ))}
        </Grid>
    );
}

export default WaitingListForTutor;
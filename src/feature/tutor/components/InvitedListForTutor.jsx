import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Room from '../../components/Room/Room';

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
        <Grid container spacing={2}>
            {invitedList.map( (invited)=> (
                <Room room={invited} onDelete={handleDontTryTeach} onCheck={handleTryTeach} color={"#7FDBCA"}/>
            ))}
        </Grid>
    );
}

export default InvitedListForTutor;
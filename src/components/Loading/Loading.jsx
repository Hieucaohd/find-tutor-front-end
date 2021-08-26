import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';

Loading.propTypes = {
    
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        'z-index': 2,
    }
})

function Loading(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default Loading;
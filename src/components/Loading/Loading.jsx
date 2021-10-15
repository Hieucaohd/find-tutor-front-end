import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

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
        'z-index': 4,
    }
})

function Loading({whiteBkg = false}) {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{backgroundColor: whiteBkg ? '#F4F4F4' : 'rgba(0,0,0,0.5)'}}>
            <CircularProgress />
        </div>
    );
}

export default Loading;
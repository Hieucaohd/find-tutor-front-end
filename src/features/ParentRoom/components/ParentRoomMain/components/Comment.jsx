import React from 'react';
import PropTypes from 'prop-types';
import { FcUndo } from 'react-icons/fc';
import { makeStyles } from '@material-ui/core';

Comment.propTypes = {
    
};

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    back: {
        position: 'absolute',
        top: '8px',
        left: '8px',
        fontSize: '24px',
        opacity: '0.6',
        "&:hover": {
            cursor: "pointer",
            opacity: 1,
        }
    }
})

function Comment({onClose}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.back} onClick={()=> onClose()}>
                <FcUndo  />
            </div>
        </div>
    );
}

export default Comment;
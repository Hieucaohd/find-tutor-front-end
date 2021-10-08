import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { IoCopy, IoCloseCircleSharp } from 'react-icons/io5';
import Tooltip from "@material-ui/core/Tooltip";
import { useState } from 'react';

NumberPhone.propTypes = {
    
};

function NumberPhone({numberPhone = "***********", onClose = null}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.root}>
            <div className={classes.overlay} onClick={() => onClose()}></div>
            <div className={classes.phone}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span>
                        {numberPhone}
                    </span>
                    <Tooltip title="Copy thành công" open={open}>
                        <button className={classes.copy} onClick={() => {navigator.clipboard.writeText(numberPhone); setOpen(true) }}>< IoCopy /></button>
                    </Tooltip>
                </div>
                
                <button className={classes.close} onClick={() => onClose()}><IoCloseCircleSharp /></button>

            </div>
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,      
    },
    phone: {
        width: 220,
        height: 60,
        borderRadius: 4,
        backgroundColor: 'white',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: '1px solid #2fbc5e',
        position: 'relative',
    },
    copy: {
        border: 'none',
        background: 'none',
        color: '#2fbc5e',
        fontSize: 24,
        display: 'flex',
        "&:hover": {
            transform: 'scale(1.2)',
            cursor: 'pointer',
        }
    },
    close: {
        // position: 'absolute',
        border: 'none',
        background: 'none',
        color: 'red',
        right: 0,
        top: 0,
        fontSize: 24,
        display: 'flex',
        "&:hover": {
            transform: 'scale(1.2)',
            cursor: 'pointer',
        }
    }
})

export default NumberPhone;
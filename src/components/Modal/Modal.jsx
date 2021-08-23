import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

Modal.propTypes = {
    text: PropTypes.string,
    onAgree: PropTypes.func,
    onDisagree: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", /* Black background with opacity */
        "z-index": "899",
    },
    modal: {
        width: "240px",
        height: "76px",
        backgroundColor: "white",
        borderRadius: "8px",
        position: "relative",
    },
    text: {
        fontSize: "16px",
        marginLeft: "12px",
    },
    buttonGroup: {
        display: "flex",
        position: 'absolute',
        right: "12px",
        bottom: "12px",
        "& button": {
            backgroundColor: "transparent",
            border: "none",
            fontSize: "14px",
            color: "#1976D2",
            opacity: "0.6",
            "&:hover": {
                cursor: "pointer",
                opacity: "1",
            }
        }
    }

})

function Modal({text, onAgree = null, onDisagree = null}) {
    const classes = useStyles();
    const handleAgree = () => {
        onAgree();
    }
    const handleDisagree = () => {
        onDisagree();
    }
    return (
        <div className={classes.root}>
            <div className={classes.modal}>
                <p className={classes.text}>
                    {text}
                </p>
                <div className={classes.buttonGroup}>
                    {onDisagree && <button onClick={handleDisagree}>
                        Hủy
                    </button>}
                    {onAgree && <button onClick={handleAgree}>
                        Đồng ý
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;
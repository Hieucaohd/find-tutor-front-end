import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { TiDeleteOutline, TiInfoOutline, TiInputChecked } from "react-icons/ti";
import { motion } from "framer-motion";

Modal.propTypes = {
    text: PropTypes.string,
    onAgree: PropTypes.func,
    onDisagree: PropTypes.func,
};

function Modal({typeIcon, text, onAgree = null, onDisagree = null}) {
    const classes = useStyles();
    const handleAgree = () => {
        onAgree();
    }
    const handleDisagree = () => {
        onDisagree();
    }
    return (
        <div className={classes.root}>
            <motion.div animate={{ scale: 1.1 }}
    transition={{ duration: 0.1 }} className={classes.modal}>
                {typeIcon === 'delete' && <TiDeleteOutline className={classes.delete}/>}
                {typeIcon === 'check' && <TiInputChecked className={classes.check}/>}
                {typeIcon === 'fail' && <TiInfoOutline className={classes.delete}/>}
                <p className={classes.text}>
                    {text}
                </p>
                <div className={classes.buttonGroup}>
                    {onAgree && <button className={classes.agree} onClick={handleAgree}>
                        Tiếp tục
                    </button>}
                    {onDisagree && <button className={classes.disagree} onClick={handleDisagree}>
                        Hủy
                    </button>}
                </div>
            </motion.div>
        </div>
    );
}

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
        "& svg": {
            fontSize: 80,
        }
    },
    modal: {
        width: "308px",
        height: "172px",
        backgroundColor: "white",
        borderRadius: "4px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 8,
    },
    text: {
        fontSize: "16px",
        margin: 0,
    },
    buttonGroup: {
        // display: "flex",
        // position: 'absolute',
        // right: "12px",
        // bottom: "12px",
        "& button": {
            // backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            // color: "#1976D2",
            opacity: "0.6",
            margin: "0 8px",
            padding: '4px 8px',
            borderRadius: 4,
            color: 'white',
            "&:hover": {
                cursor: "pointer",
                opacity: "1",
            }
        }
    },
    delete: {
        color: 'red',
    },
    check: {
        color: '#00AA85',
    }, 
    agree: {
        backgroundColor: '#0061FF',
    },
    disagree: {
        backgroundColor: '#AAAAAA',
    }
})

export default Modal;
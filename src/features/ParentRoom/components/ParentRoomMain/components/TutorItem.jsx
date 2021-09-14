import { Avatar, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdPeople } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useHistory } from 'react-router-dom';

TutorItem.propTypes = {
    tutorId: PropTypes.number.isRequired,
    onCheck: PropTypes.func,
    onDelete: PropTypes.func,
    id: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
        "display": "flex",
        "align-item": "center",
        "justify-content": "center",
    },
    avatar: {
        width: 30,
        height: 30,
        "margin-right" : 8,
    },
    item: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        padding: '4px',
        borderRadius: '4px',
        "&:hover": {
            backgroundColor: '#ccc',
            cursor: 'pointer',
        }
    },
    name: {
        display: 'flex',
        "align-items": "center",
        "& div": {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            "& h5": {
                margin: 0,
                fontSize: '12px',
            },
            "& span": {
                fontSize: '10px',
                fontWeight: 300,
            },
        }
    },
    check: {
        "background-color": "transparent",
        "border": "none",
        "color": "#008866",
        "font-size": "24px",
        "display": "flex",
        "opacity" : 0.6,
        "&:hover": {
            "opacity" : 1,
        }
    },
    delete: {
        "background-color": "transparent",
        "border": "none",
        "font-size": "31px",
        "color": "#FD3131",
        "display": "flex",
        "opacity" : 0.6,
        "&:hover": {
            "opacity" : 1,
        }
    },
    buttonGroup: {
        display: 'flex',
        alignItems: "center",
        "& button": {
            padding: 0,
        }
    }
});

function TutorItem( {id, tutor, onCheck, onDelete, onWait} ) {
    const classes = useStyles();
    const history = useHistory();

    const handleCheck = () => {
        onCheck(id);
    }

    const handleDelete = () => {
        onDelete(id);
    }
    const handleShowTutorInfo = () => {
        history.push(`/profile/tutor/${tutor.user.id}`)
    }
    return (
        <div className={classes.item}>
            <div className={classes.name} onClick={handleShowTutorInfo}>
                <Avatar alt="tutor" 
                    src = {tutor?.user.imageprivateusermodel?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3I4Y2ydmFBosgWcdoqVBBCsYZksWAhHtjg&usqp=CAU"}
                    className={classes.avatar}
                />
                <div><h5>{tutor.first_name} {tutor.last_name}</h5> <span>{tutor?.user.username}</span></div>
            </div>
            <div className={classes.buttonGroup}>
                {onCheck && !onWait && <button className={classes.check} onClick={handleCheck}><AiFillCheckCircle /></button> }
                {onCheck && onWait && <button className={classes.check} > <IoMdPeople /></button>}
                {onDelete && <button className={classes.delete} onClick={handleDelete}><TiDelete /></button> }
            </div>
        </div>
    );
}

export default TutorItem;
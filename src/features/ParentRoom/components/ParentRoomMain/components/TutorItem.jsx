import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTutorProfile } from '../../../../Profile/profile';
import { Avatar, makeStyles } from '@material-ui/core';
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IoMdPeople } from "react-icons/io";
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
    flexbox: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
    },
    name: {
        display: 'flex',
        "align-items": "center",
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
        <div className={classes.flexbox}>
            <div className={classes.name} onClick={handleShowTutorInfo}>
                <Avatar alt="tutor" src = "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" className={classes.avatar}/>
                {tutor.first_name} {tutor.last_name}
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
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTutorProfile } from '../../../../profile/profile';
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

function TutorItem( {id, tutorId, onCheck, onDelete, onWait} ) {
    const classes = useStyles();
    const [tutorInfo, setTutorInfo] = useState({})
    const history = useHistory();
    useEffect( () => {
        const getTutorInfo = async () => {
            const info = await getTutorProfile({id: tutorId});
            const newInfo = {
                id: tutorId,
                name: `${info.first_name} ${info.last_name}`,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScPuSSp3dmio9nEwA8FEAppD_ZzC7j7pCaDKYjiG1thpF4AyTQ-CvOonekXg3JdRl-_Kk&usqp=CAU"
            }
            setTutorInfo(newInfo);
        }
        getTutorInfo();
    }, [])

    const handleCheck = () => {
        onCheck(id);
    }

    const handleDelete = () => {
        onDelete(id);
    }
    const handleShowTutorInfo = () => {
        history.push(`/tutorprofile/${tutorId}`)
    }
    return (
        <div className={classes.flexbox}>
            <div className={classes.name} onClick={handleShowTutorInfo}>
                <Avatar alt="tutor" src = {tutorInfo.avatar} className={classes.avatar}/>
                {tutorInfo.name}
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
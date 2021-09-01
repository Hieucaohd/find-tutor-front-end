import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { GiTeacher } from "react-icons/gi";
import { RiParentFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectToken } from '../../../auth/authSlice';

RegisterRole.propTypes = {
    
};

const useStyles = makeStyles(theme =>({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    tutor: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0AC97F',
        width: '250px',
        height: '250px',
        margin: '32px',
        color: 'white',
        borderRadius: '44px',
        opacity: '0.7',
        '& span': {
            fontSize: '100px',
        },
        '&:hover': {
            cursor: 'pointer',
            opacity: '1',
        },
    },
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '250px',
        height: '250px',
        backgroundColor: '#9D56F7',
        margin: '32px',
        color: 'white',
        borderRadius: '44px',
        opacity: '0.7',
        '& span': {
            fontSize: '100px',
        },
        '&:hover': {
            opacity: '1',
            cursor: 'pointer',
        },
    }
}));

function RegisterRole(props) {
    const classes = useStyles();
    const history = useHistory();
    const token = useSelector(selectToken);

    useEffect( () => {
        if(!token) {
            history.push("/login");
        }
    }, [token])

    const handleChooseParent = () => {
        history.push("/signup/parent");
    }

    const handleChooseTutor = () => {
        history.push("/signup/tutor");
    }

    return (
        <div className={classes.root}>
            <div onClick={handleChooseTutor} className={classes.tutor}>
                <span><GiTeacher /></span>
                <h4>Đăng kí làm gia sư</h4>
            </div>
        
            <div onClick={handleChooseParent} className={classes.parent}>
                <span><RiParentFill /></span>
                <h4>Đăng kí làm phụ huynh</h4>
            </div>
        </div>
    );
}

export default RegisterRole;
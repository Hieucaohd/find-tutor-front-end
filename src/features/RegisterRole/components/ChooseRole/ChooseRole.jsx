import { makeStyles } from '@material-ui/core';
import { isSignedIn } from 'features/auth/cookies';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
        "& img": {
            width: 100,
            height: 100,
        }
    },
    tutor: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CFC7E3',
        [theme.breakpoints.down('xs')]: {
            width: '200px',
            height: '200px'
        },
        [theme.breakpoints.up('sm')]: {
            width: '250px',
            height: '250px',
        },
        margin: '32px',
        color: 'black',
        borderRadius: '16px',
        opacity: '0.7',
        boxShadow: '0 1px 4px #ccc',
        '& span': {
            [theme.breakpoints.down('xs')]: {
                fontSize: '80px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '100px',
            },
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
        [theme.breakpoints.down('xs')]: {
            width: '200px',
            height: '200px'
        },
        [theme.breakpoints.up('sm')]: {
            width: '250px',
            height: '250px',
        },
        backgroundColor: '#83D8E2',
        margin: '32px',
        color: 'black',
        borderRadius: '16px',
        boxShadow: '0 1px 4px #ccc',
        opacity: '0.7',
        '& span': {
            [theme.breakpoints.down('xs')]: {
                fontSize: '80px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '100px',
            },
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
    
    if(!isSignedIn()) {
        history.push("/signin");
    }

    const handleChooseParent = () => {
        history.push("/role/parent");
    }

    const handleChooseTutor = () => {
        history.push("/role/tutor");
    }


    return (
        <div className={classes.root}>
            <div onClick={handleChooseTutor} className={classes.tutor}>
                <img src="https://i.ibb.co/5xJH98b/teacher.webp" alt="teacher" border="0"/>
                <h4>Đăng kí làm gia sư</h4>
            </div>
        
            <div onClick={handleChooseParent} className={classes.parent}>
                <img src="https://i.ibb.co/M2ypJj9/parents.webp" alt="parents" border="0"/>
                <h4>Đăng kí làm phụ huynh</h4>
            </div>
        </div>
    );
}

export default RegisterRole;
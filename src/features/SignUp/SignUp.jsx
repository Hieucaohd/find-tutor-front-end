import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        "& img": {
            width: 400,
            height: 400,
        },
    },
    banner: {
        flex: 2,
        backgroundColor: '#c9ddfd',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        
    },
    login: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        "& h2": {

        }
    }
}))

function SignUp(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.banner}> 
                <img src="https://i.ibb.co/R4cCHXL/Student-giving-test-to-teacher-2.webp" alt="Student-giving-test-to-teacher-2" border="0" />
            </div>
            <div className={classes.login}>
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUp;
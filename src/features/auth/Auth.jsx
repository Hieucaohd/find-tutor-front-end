import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const useStyles= makeStyles(theme=>({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,        
        backgroundImage: "url(\"https://i.ibb.co/PGwkBLZ/education-elementary-school-learning-and-people-concept-teacher-helping-school-kids-writing-test-in.jpg\")", 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
    }
}));

function Auth(props) {
    
    const classes = useStyles();
    const [showLoginForm, setShowLoginForm] = useState(true);
    const handleShowRegisterForm = () => {
        setShowLoginForm(false);
    }
    const handleShowLoginForm = () => {
        setShowLoginForm(true);
    }
    return (
        <div className={classes.root}>
            {showLoginForm ? <Login onShow={handleShowRegisterForm}/> : <Register onClose={handleShowLoginForm}/>}
        </div>
    );
}

export default Auth;
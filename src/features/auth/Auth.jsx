import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import "./styles.scss";

function Auth(props) {

    const [showLoginForm, setShowLoginForm] = useState(true);
    const handleShowRegisterForm = () => {
        setShowLoginForm(false);
    }
    const handleShowLoginForm = () => {
        setShowLoginForm(true);
    }
    return (
        <div className="auth">
            {showLoginForm ? <Login onShow={handleShowRegisterForm}/> : <Register onClose={handleShowLoginForm}/>}
        </div>
    );
}

export default Auth;
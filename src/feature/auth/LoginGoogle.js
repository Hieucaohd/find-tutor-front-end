import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from './authSlice';

const clientId = "942367744238-iskdfiih91lh66ipgajrug7ioisfml0o.apps.googleusercontent.com";

function LoginGoogle() {
    const dispatch = useDispatch();

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.tokenId);
        dispatch(loginWithGoogle({
            "auth_token" : res.tokenId,
        }));
    };

    const onLoginFailure = (res) => {
        console.log("Đăng nhập google thất bại");
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    );
}
export default LoginGoogle;
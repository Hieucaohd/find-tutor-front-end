import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { loginWithFacebook } from '../authSlice';

function LoginFacebook(props) {

    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        dispatch(loginWithFacebook({
            "auth_token" : response.accessToken,
        }))
    }

    return (
        <div>
            <FacebookLogin
                appId="290296406188562"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon={<AiFillFacebook />}
            />
        </div>
    );
}

export default LoginFacebook;
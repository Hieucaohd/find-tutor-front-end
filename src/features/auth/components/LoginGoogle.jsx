import { makeStyles } from '@material-ui/core';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../authSlice';

const clientId = "942367744238-iskdfiih91lh66ipgajrug7ioisfml0o.apps.googleusercontent.com";

const useStyles = makeStyles({
    root: {
        
        "& button": {
            boxShadow: 'none!important',
            borderRadius: '64px!important',
            border: '1px solid #ccc!important',
            justifyContent: 'center!important',
        }
    }
})

function LoginGoogle() {
    const classes = useStyles();
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
        <div className={classes.root}>
            <GoogleLogin
                clientId={clientId}
                buttonText="Tiếp tục với Google"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    );
}
export default LoginGoogle;
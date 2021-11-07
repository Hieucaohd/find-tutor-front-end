import axios from "axios";
import { server_name } from "namespace";

export const loginWithMail = (args) => {
    return axios({
        method: 'post',
        url: `${server_name}/auth/login/`,
        data: args,
    }).then(response => {
        if(response.data) return response.data;
    }).catch(error => {
        console.log("Failed to login: ", error);
    })
}

export const loginWithGoogleAccount = args => {
    return axios({
        method: 'post',
        url: `${server_name}/social-auth/google-auth/`,
        data: args,
    }).then(response => {
        if(response.data) return response.data;
    }).catch(error => {
        console.log("Failed to login with google: ", error);
    })
}

export const loginWithFacebookAccount = args => {
    return axios({
        method: 'post',
        url: `${server_name}/social-auth/facebook-auth/`,
        data: args,
    }).then(response => {
        if(response.data) return response.data;
    }).catch(error => {
        console.log("Failed to login with facebook: ", error);
    })
}

export const logOut = () => {
    return axios({
        method: 'post',
        url: `${server_name}/auth/logout/`,
    }).catch(error => {
        console.log("Failed to log out : ", error);
    })
}

export const registerAccount = async (args) => {
    return axios({
        method: 'post',
        url: `${server_name}/auth/register/`,
        data: args,
    }).then((response) => {
        if(response.data) return response.data;
    }).catch(error => {
        console.log("Failed to sign up : ", error);
        return false;
    })
};



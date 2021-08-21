import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const setUserInfoCookies = (info) => {
    const {token, id, refresh_token, type_parent, type_tutor, id_parent, id_tutor} = info;
    cookies.set('userToken', token, { secure: true, sameSite: true, maxAge: 59*60});
    cookies.set('userRefreshToken', refresh_token, { secure: true, sameSite: true, maxAge: 59*60});
    cookies.set('userId', id, { secure: true, sameSite: true});
    cookies.set('userTypeParent', type_parent, { secure: true, sameSite: true, maxAge: 59*60});
    cookies.set('userTypeTutor', type_tutor, { secure: true, sameSite: true, maxAge: 59*60});
    cookies.set('userParentId', id_parent, { secure: true, sameSite: true, maxAge: 59*60});
    cookies.set('userTutorId', id_tutor, { secure: true, sameSite: true, maxAge: 59*60});
}

export const setParentCookieTrue = () => {
    cookies.set('userTypeParent', true, { secure: true, sameSite: true, maxAge: 59*60});
}

export const setTutorCookieTrue = () => {
    cookies.set('userTypeTutor', true, { secure: true, sameSite: true, maxAge: 59*60});
}

export const setNewTokenCookie = (newToken) => {
    cookies.set('userToken', newToken, { secure: true, sameSite: true, maxAge: 59*60});
}

export const getDataFromCookies = () => {
    return {
        token: cookies.get('userToken'),
        refreshToken: cookies.get('userRefreshToken'),
        id: cookies.get('userId'),
        typeParent: cookies.get('userTypeParent') === "false" ? false : true,
        typeTutor: cookies.get('userTypeTutor') === "false" ? false : true,
        idParent: cookies.get('userParentId'),
        idTutor: cookies.get('userTutorId'),
    }
}

export const getRefreshTokenCookie = () => {
    return cookies.get('userRefreshToken');
}

export const setTutorIdCookie = (id) => {
    cookies.set('userTutorId', id, { secure: true, sameSite: true});
}

export const setParentIdCookie = (id) => {
    cookies.set('userParentId', id, { secure: true, sameSite: true});
}

export const isTokenCookie = () => {
    return cookies.get('userToken') ? true : false;
}

export const removeUserCookies = () => {
    cookies.remove('userToken');
    cookies.remove('userRefreshToken');
    cookies.remove('userId');
    cookies.remove('userTypeParent');
    cookies.remove('userTypeTutor');
    cookies.remove('userParentId');
    cookies.remove('userTutorId');
}

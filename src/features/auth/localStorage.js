export const setUserInfoToLocalStorage = (info) => {
    const {token, id, type_parent, type_tutor, email, username} = info;
    localStorage.setItem('userId', id);
    localStorage.setItem('userTypeParent', type_parent);
    localStorage.setItem('userTypeTutor', type_tutor);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isSignedIn', true)
    localStorage.setItem('userName', username);
    localStorage.setItem('token', token);
}

export const setAvatarLocalStorage = (url) => {
    localStorage.setItem('userAvatar', url)
}

export const setParentTrueLocalStorage = () => {
    localStorage.removeItem('userTypeParent');
    localStorage.setItem('userTypeParent', true);
}

export const setTutorTrueLocalStorage = () => {
    localStorage.removeItem('userTypeTutor');
    localStorage.setItem('userTypeTutor', true);
}

export const removeUserInfoLocalStorage = () => {
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userTypeParent');
    localStorage.removeItem('userTypeTutor');
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem("userAvatar");
}
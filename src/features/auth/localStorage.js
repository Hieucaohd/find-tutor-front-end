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

export const setParentTrueLocalStorage = () => {
    localStorage.removeItem('userTypeParent');
    localStorage.setItem('userTypeParent', true);
}

export const setTutorTrueLocalStorage = () => {
    localStorage.removeItem('userTypeTutor');
    localStorage.setItem('userTypeTutor', true);
}

export const removeUserInfoLocalStorage = () => {
    localStorage.remove('userToken');
    localStorage.remove('userRefreshToken');
    localStorage.remove('userId');
    localStorage.remove('userTypeParent');
    localStorage.remove('userTypeTutor');
    localStorage.remove('isSignedIn');
    localStorage.remove('userEmail');
    localStorage.remove('userName')
}
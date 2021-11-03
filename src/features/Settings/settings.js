const { server_name} = require("namespace");

export const updateTutorProfile = async ({newTutorInfo, id}) => {
    try {
        await fetch(`${server_name}/findTutor/tutorDetail/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTutorInfo),
        })
        return true;
    } catch (error) {
        console.log("Failed to update tutor's profile: ", error);
        return false;
    }
}

export const updateParentProfile = async ({newTutorInfo, id}) => {
    try {
        await fetch(`${server_name}/findTutor/parentDetail/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTutorInfo),
        })
        return true;
    } catch (error) {
        console.log("Failed to update parent's profile: ", error);
        return false;
    }
}

export const updateLink = async ({ token, newLink}) => {
    try {
        await fetch(`${server_name}/auth/updateMultipleLink/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLink),
        })
        return true;
    } catch (error) {
        console.log("Failed to update user's link: ", error);
        return false;
    }
    
} 

export const getName = (name) => {
    return {
      first_name: name.slice(0, name.indexOf(' ')),
      last_name: name.slice(name.indexOf(' ') + 1)
    }
}

export const changePassword = async ({token, oldPassword, newPassword}) => {
    try {
        await fetch(`${server_name}/auth/changePassword/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "old_password": oldPassword,
                "new_password": newPassword,
            }),
        })
        return true;
    } catch (error) {
        console.log("Failed to change password: ", error);
        return false;
    }
}

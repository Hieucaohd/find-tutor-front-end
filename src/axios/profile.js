import axios from "axios";
import { setParentTrue, setTutorTrue } from "features/auth/authSlice";
import { server_name, token_prefix } from "namespace";

export const registerTutorInfor = async ({ tutorInfor, dispatch }) => {
    return axios({
        method: "post",
        url: `${server_name}/findTutor/tutorList/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: tutorInfor,
    }).then(response => {
        if(response.data) {
            dispatch(setTutorTrue());
            return true;
        }
    }).catch(error => {
        console.log('Failed to resgister tutor', error);
        return false;
    })
  };
  
export const registerParentInfor = async ({parentInfor, dispatch }) => {
    return axios({
        method: "post",
        url: `${server_name}/findTutor/parentList/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: parentInfor,
    }).then(response => {
        if(response.data) {
            dispatch(setParentTrue());
            return true;
        }
    }).catch(error => {
        console.log('Failed to resgister tutor', error);
        return false;
    })
};
  
export const registerImage = async ({token, file}) => {
    try {
      const data = file;
      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        url: `${server_name}/findTutor/imagePrivateUserList/`,
        data
      })
      return true;
    } catch(error) {
      console.log('Failed to register image ', error);
      return false;
    }
}

export const updateAvatar = ({file}) => {
    return axios({
        method: "PUT",
        url: `${server_name}/findTutor/imagePrivateUserDetail/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: file
      }).then(response => {
        if(response.data) return true;
      }).catch(error => {
          console.log("Failed to update avatar: ", error);
          return false;
      })
}

export const updateTutorProfile = async ({newTutorInfo, id}) => {
    console.log(newTutorInfo);
    return axios({
        method: "put",
        url: `${server_name}/findTutor/tutorDetail/${id}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: newTutorInfo,
    }).then(response => {
        console.log(response);
        if(response) return true;
    }).catch(error => {
        console.log("Failed to update tutor's profile: ", error);
        return false;
    })
}

export const updateParentProfile = async ({newParentInfo, id}) => {
    console.log(newParentInfo);
    return axios({
        method: "put",
        url: `${server_name}/findTutor/parentDetail/${id}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: newParentInfo,
    }).then(response => {
        console.log(response);
        if(response) return true;
    }).catch(error => {
        console.log("Failed to update parent's profile: ", error);
        return false;
    })
}

export const updateLink = async ({ token, newLink}) => {
    return axios({
        method: "put",
        url: `${server_name}/auth/updateMultipleLink/`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: newLink,
    }).then(response => {
        if(response) return true;
    }).catch(error => {
        console.log("Failed to update user's link: ", error);
        return false;
    })
} 


export const changePassword = async ({token, oldPassword, newPassword}) => {
    return axios({
        method: "put",
        url: `${server_name}/auth/changePassword/`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data: {
            "old_password": oldPassword,
            "new_password": newPassword,
        }
    }).then((response) => {
        if(response) return true;
    }).catch(error => {
        console.log("Failed to change password: ", error);
        return false;
    })
}

import axios from "axios";
import { server_name, token_prefix } from "../../namespace";

export const getParentProfile = async ({id}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/parentDetail/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
          },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log("Failed to get parent profile : ", error)
    }
}

export const getTutorProfile = async ({id}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/tutorDetail/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
          },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log("Failed to get tutor profile : ", error)
    }
}

export const formatBirthDay = (birthday) => {
  if(!birthday || birthday.length === 0) return "";
  const newBirthDay = `${birthday.slice(-2)}-${birthday.slice(5,7)}-${birthday.slice(0,4)}`
  return newBirthDay;
}

export const updateAvatar = async ({typeCurrent, file}) => {
    const data = file
    try {
      await axios({
        method: "PUT",
        url: `${server_name}/findTutor/imagePrivateUserDetail/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${localStorage.getItem('token')}`,
        },
        data
      })
      return true;
    } catch(error) {
      console.log('Failed to update image ', error);
      return false;
    }
}
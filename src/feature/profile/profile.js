import { server_name, token_prefix } from "../../namespace";

export const getParentProfile = async ({id, token}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/parentDetail/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${token}`,
          },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log("Failed to get parent profile : ", error)
    }
}

export const getTutorProfile = async ({id, token}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/tutorDetail/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_prefix} ${token}`,
          },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log("Failed to get tutor profile : ", error)
    }
}
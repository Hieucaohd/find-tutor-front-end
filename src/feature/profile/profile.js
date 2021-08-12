import { server_name } from "../../namespace";

export const getParentProfile = async ({id}) => {
    try {
        const response = await fetch(`${server_name}/findTutor/parentDetail/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          },
        });
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log("Failed to get tutor profile : ", error)
    }
}
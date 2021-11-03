import axios from "axios";
import { setParentTrue, setTutorTrue } from "features/auth/authSlice";
import { server_name } from "../../namespace";

export const registerTutorInfor = async ({ tutorInfor, dispatch }) => {
  try {
    await fetch(`${server_name}/findTutor/tutorList/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorInfor),
    })
    // await response.json();
    dispatch(setTutorTrue());
    return true;
  } catch(error) {
    console.log('Failed to resgister tutor', error);
    return false;
  }
};

export const registerParentInfor = async ({parentInfor, dispatch }) => {
  try {
    await fetch(`${server_name}/findTutor/parentList/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parentInfor),
    })
    dispatch(setParentTrue());
    return true;
  } catch(error) {
    console.log('Failed to resgister tutor', error);
    return false;
  }
};

export const registerImage = async ({token, file}) => {
  try {
    const data = file;
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
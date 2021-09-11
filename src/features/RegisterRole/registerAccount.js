import axios from "axios";
import { setParentTrue, setTutorTrue } from "features/auth/authSlice";
import { server_name, token_prefix } from "../../namespace";


export const registerTutorInfor = async ({ token, tutorInfor, dispatch }) => {
  try {
    const response =  await fetch(`${server_name}/findTutor/tutorList/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
      body: JSON.stringify(tutorInfor),
    })
    const responseJSON = await response.json();
    dispatch(setTutorTrue());
    return true;
  } catch(error) {
    console.log('Failed to resgister tutor', error);
    return false;
  }
};

export const registerParentInfor = async ({ token, parentInfor, dispatch }) => {
  try {
    const response =  await fetch(`${server_name}/findTutor/parentList/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
      body: JSON.stringify(parentInfor),
    })
    const responseJSON = await response.json();
    dispatch(setParentTrue());
    return true;
  } catch(error) {
    console.log('Failed to resgister tutor', error);
    return false;
  }
};

export const registerImageTutor = async ({token, file}) => {
  try {
    const data = file;
    axios({
      method: "POST",
      url: `${server_name}/findTutor/imagePrivateUserList/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`
      },
      data
    })
    return true;
  } catch(error) {
    console.log('failed to register image ', error);
    return false;
  }
}
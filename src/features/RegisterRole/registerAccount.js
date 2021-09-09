import { setId, setParentTrue, setTutorTrue } from "features/auth/authSlice";
import { setParentIdCookie, setTutorIdCookie } from "features/auth/cookies";
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
    setTutorIdCookie(responseJSON.id);
    dispatch(setTutorTrue());
    dispatch(setId({tutorId: responseJSON.id}));
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
    setParentIdCookie(responseJSON.id);
    dispatch(setId({parentId: responseJSON.id}));
    dispatch(setParentTrue());
    return true;
  } catch(error) {
    console.log('Failed to resgister tutor', error);
    return false;
  }
};

export const registerImageTutor = async ({token, avatar, identity_card, student_card}) => {
  try {
    await fetch(`${server_name}/findTutor/imagePrivateUserList/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
      body: JSON.stringify({avatar: avatar, identity_card: identity_card , student_card: student_card}),
    })
    return true;
  } catch(error) {
    console.log('failed to register image ', error);
    return false;
  }
}
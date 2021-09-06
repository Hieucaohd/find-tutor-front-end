import { server_name, token_prefix } from "../../namespace";



export const registerTutorInfor = async ({ token, tutorInfor }) => {
  return await fetch(`${server_name}/findTutor/tutorList/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_prefix} ${token}`,
    },
    body: JSON.stringify(tutorInfor),
  })
};

export const registerParentInfor = async ({ token, parentInfor }) => {
  return await fetch(`${server_name}/findTutor/parentList/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_prefix} ${token}`,
    },
    body: JSON.stringify(parentInfor),
  });
};


import { server_name } from "..//..//namespace";

export const registerAccount = async (args) => {
  return await fetch(`${server_name}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("không đăng kí tài khoản thành công");
    }
  });
};

export const registerInfo = async (args) => {
  return await fetch("http://localhost:8000/findTutor/tutorList/", {
    method: "POST",
    header: args.token,
    body: {},
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      alert("không đăng kí tài khoản thành công");
    }
  });
};

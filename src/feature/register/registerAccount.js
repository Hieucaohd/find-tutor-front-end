import { server_name, token_prefix } from "../../namespace";

export const registerAccount = async (args) => {
  return await fetch(`${server_name}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  })
};

export const registerTutorInfor = async ({ token, tutorInfor }) => {
  return await fetch(`${server_name}/findTutor/tutorList/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_prefix} ${token}`,
    },
    body: JSON.stringify(tutorInfor),
  }).then((response) => {
    if (response.ok) {
      alert(`Bạn đã đăng kí làm gia sư thành công.`);
      return response.json();
    } else {
      alert(
        "Có lỗi xảy ra, bạn hiện tại chưa thể đăng kí làm gia sư, vui lòng thử lại sau."
      );
      return false;
    }
  });
};

export const registerParentInfor = async ({ token, parentInfor }) => {
  return await fetch(`${server_name}/findTutor/parentList/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_prefix} ${token}`,
    },
    body: JSON.stringify(parentInfor),
  }).then((response) => {
    if (response.ok) {
      alert(`Bạn đã đăng kí làm phụ huynh thành công.`);
      return response.json();
    } else {
      alert(
        "Có lỗi xảy ra, bạn hiện tại chưa thể đăng kí làm phụ huynh, vui lòng thử lại sau."
      );
      return false;
    }
  });
};


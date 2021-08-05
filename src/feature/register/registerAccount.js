import { createSlice } from "@reduxjs/toolkit";
import { server_name, token_prefix } from "../../namespace";
import { setParentTrue, setTutorTrue } from "../auth/authSlice";

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
      console.log(response);
      alert(`Bạn đã đăng kí làm gia sư thành công.`);
      return true;
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
      console.log(response);
      alert(`Bạn đã đăng kí làm phụ huynh thành công.`);
      return true;
    } else {
      alert(
        "Có lỗi xảy ra, bạn hiện tại chưa thể đăng kí làm phụ huynh, vui lòng thử lại sau."
      );
      return false;
    }
  });
};

const initialState = {
  username: null,
  email: null,
  token: null, 
  refresh_token: null,
  id: null,
  type_tutor: null,
  type_parent: null,
}

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setInfo(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.id = action.payload.id;
      state.type_tutor = action.payload.type_tutor;
      state.type_parent = action.payload.type_parent;
    }
  }
});

export default registerSlice.reducer;

export const { setInfo } = registerSlice.actions;

export const selectRegisterInfo = (state) => state.register;

// export const registerForTutorInfor = async ({argForAccount, argForTutorInfor}) => {

// }

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  token: "",
  id: "",
  type_tutor: "",
  type_parent: "",
};

// Lấy: id, token, type_tutor, type_parent từ server.
export const login = createAsyncThunk("auth/authLogin", async (args) => {
  // args gồm username và password.
  return await fetch("http://localhost:8000/findTutor/getToken/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Ten dang nhat hoac mat khau khong dung.");
    }
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.token = "";
      state.id = "";
      state.type_tutor = "";
      state.type_parent = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          const { token, id, type_tutor, type_parent } = action.payload;
          state.token = token;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
        }
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

// Lấy: id, token, type_tutor, type_parent cho component
export const selectToken = (state) => state.auth.token;
export const selectId_of_user = (state) => state.auth.id;
export const selectType_tutor = (state) => state.auth.type_tutor;
export const selectType_parent = (state) => state.auth.type_parent;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server_name } from "../../namespace";

const initialState = {
  status: "idle",
  token: "",
  refresh_token: "",
  id: "",
  type_tutor: "",
  type_parent: "",
};

// Lấy: id, token, type_tutor, type_parent từ server.
export const login = createAsyncThunk("auth/authLogin", async (args) => {
  return await fetch(`${server_name}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Ten dang nhat hoac mat khau khong dung.");
      return response.json();
    }
  });
});

export const loginWithGoogle = createAsyncThunk("/social-auth/google-auth/", async (args) => {
  try {
    const response = await fetch(`${server_name}/social-auth/google-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log('Failed to login with google: ',error);
  }
});

export const loginWithFacebook = createAsyncThunk("/social-auth/facebook-auth/", async (args) => {
  try {
    const response = await fetch(`${server_name}/social-auth/facebook-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log('Failed to login with facebook: ',error);
  }
})

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
    setTutorTrue(state, action) {
      state.type_tutor = true;
    },
    setParentTrue(state, action) {
      state.type_parent = true;
    },
    setDataFromRegister(state, action) {
      state.status = "idle";
      const { token, refresh_token, id, type_tutor, type_parent } = action.payload;
      state.token = token;
      state.refresh_token = refresh_token;
      state.id = id;
      state.type_tutor = type_tutor;
      state.type_parent = type_parent;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const { token, refresh_token, id, type_tutor, type_parent } = action.payload;
          state.token = token;
          state.refresh_token = refresh_token;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
        }
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const { token, refresh_token, id, type_tutor, type_parent } = action.payload;
          state.token = token;
          state.refresh_token = refresh_token;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
        }
      })
      .addCase(loginWithFacebook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const { token, refresh_token, id, type_tutor, type_parent } = action.payload;
          state.token = token;
          state.refresh_token = refresh_token;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
        }
      });
  },
});

export default authSlice.reducer;

export const { logout, setTutorTrue, setParentTrue, setDataFromRegister } = authSlice.actions;

// Lấy: id, token, type_tutor, type_parent cho component 
export const selectToken = (state) => state.auth.token;
export const selectId_of_user = (state) => state.auth.id;
export const selectType_tutor = (state) => state.auth.type_tutor;
export const selectType_parent = (state) => state.auth.type_parent;

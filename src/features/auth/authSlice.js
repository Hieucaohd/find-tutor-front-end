import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
import { server_name } from "../../namespace";
import { getDataFromCookies, removeUserCookies, setParentCookieTrue, setTutorCookieTrue, setUserInfoCookies } from "./cookies";
 
const cookies = new Cookies();

const initialState = cookies.get('userToken') ? {
  status: "idle",
  id: cookies.get('userId'),
  type_tutor: cookies.get('userTypeTutor') === "false" ? false : true,
  type_parent: cookies.get('userTypeParent') === "false" ? false : true,
  isSignedIn: cookies.get('isSignedIn') === 'true' ? true : false,
  email: cookies.get('userEmail'),
  userName: cookies.get('userName'),
} : {
  status: "idle",
  token: "",
  refresh_token: "",
  id: "",
  type_tutor: "",
  type_parent: "",
  isSignedIn: false,
  email: '',
  userName: '',
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
      // alert("Ten dang nhat hoac mat khau khong dung.");
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

export const logout = createAsyncThunk("/auth/logout/", async (args) => {
  try {
    await fetch(`${server_name}/auth/logout/`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Failed to log out : ", error)
  }
});

export const getNewToken = createAsyncThunk("/auth/token/refresh/", async (args) => {
  try {
    const response = await fetch(`${server_name}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    const responseJSON = await response.json();
    return responseJSON.access;
  } catch (error) {
    console.log("Failed to get new token: ", error)
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTutorTrue(state, action) {
      state.type_tutor = true;
      setTutorCookieTrue();
    },
    setParentTrue(state, action) {
      state.type_parent = true;
      setParentCookieTrue();
    },
    setStateFromCookies(state) {
      const {id, typeParent, typeTutor} = getDataFromCookies();
      state.id = id;
      state.type_tutor = typeTutor;
      state.type_parent = typeParent;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.rejected, (state) => {
        state.status = "error";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const {id, type_tutor, type_parent, email, username } = action.payload;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
          state.isSignedIn = true;
          state.email = email;
          state.userName = username;
          setUserInfoCookies(action.payload);
        }
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const {id, type_tutor, type_parent, email, username } = action.payload;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
          state.isSignedIn = true;
          state.email = email;
          state.userName = username;
          setUserInfoCookies(action.payload);
        }
      })
      .addCase(loginWithFacebook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const {id, type_tutor, type_parent, email, username } = action.payload;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
          state.isSignedIn = true;
          state.email = email;
          state.userName = username;
          // setUserInfoCookies(action.payload);
        }
      })
      .addCase(logout.pending, (state) => {
        state.status =  "loading";
        state.id = "";
        state.type_tutor = "";
        state.type_parent = "";
        state.isSignedIn = false;
        state.email = "";
        removeUserCookies();
      })
      .addCase(logout.fulfilled, (state) => {
        state.status =  "idle";
      })
      .addCase(logout.rejected, (state) => {
        state.status =  "error";
      } )

  },
});

export default authSlice.reducer;

export const { setTutorTrue, setParentTrue, setStateFromCookies } = authSlice.actions;

// Lấy: id, token, type_tutor, type_parent cho component
export const selectStateStatus = (state) => state.status;
export const selectId_of_user = (state) => state.auth.id;
export const selectType_tutor = (state) => state.auth.type_tutor;
export const selectType_parent = (state) => state.auth.type_parent;
export const selectIsSignedIn = (state) => state.auth.isSignedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.userName

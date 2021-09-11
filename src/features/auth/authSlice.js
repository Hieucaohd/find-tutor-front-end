import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server_name, token_prefix } from "../../namespace";
import { getDataFromCookies, getRefreshTokenCookie, removeUserCookies, setNewTokenCookie, setParentCookieTrue, setTutorCookieTrue, setUserInfoCookies } from "./cookies";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const initialState = cookies.get('userToken') ? {
  status: "idle",
  token: cookies.get('userToken'),
  refresh_token: cookies.get('userRefreshToken'),
  id: cookies.get('userId'),
  type_tutor: cookies.get('userTypeTutor') === "false" ? false : true,
  type_parent: cookies.get('userTypeParent') === "false" ? false : true,
} : {
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
    const {token , refresh_token } = args;
    const response = await fetch(`${server_name}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
      body: JSON.stringify({"refresh_token" : refresh_token}),
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
      const {token, refreshToken, id, typeParent, typeTutor, idParent, idTutor} = getDataFromCookies();
      state.token = token;
      state.refresh_token = refreshToken;
      state.id = id;
      state.type_tutor = typeTutor;
      state.type_parent = typeParent;
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
          const { token, refresh_token, id, type_tutor, type_parent, id_parent, id_tutor } = action.payload;
          state.token = token;
          state.refresh_token = refresh_token;
          state.id = id;
          state.type_tutor = type_tutor ;
          state.type_parent = type_parent ;
          setUserInfoCookies(action.payload);
        }
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const { token, refresh_token, id, type_tutor, type_parent, id_parent, id_tutor } = action.payload;
          state.token = token;
          state.refresh_token = refresh_token;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
          setUserInfoCookies(action.payload);
        }
      })
      .addCase(loginWithFacebook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload){
          const { token, refresh_token, id, type_tutor, type_parent, id_parent, id_tutor } = action.payload;
          state.token = token;
          state.refresh_token = refresh_token;
          state.id = id;
          state.type_tutor = type_tutor;
          state.type_parent = type_parent;
          setUserInfoCookies(action.payload);
        }
      })
      .addCase(logout.pending, (state) => {
        state.status =  "loading";
        state.token = "";
        state.refresh_token = "";
        state.id = "";
        state.type_tutor = "";
        state.type_parent = "";
        removeUserCookies();
      })
      .addCase(logout.fulfilled, (state) => {
        state.status =  "idle";
      })
      .addCase(logout.rejected, (state) => {
        state.status =  "error";
      } )
      .addCase(getNewToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewToken.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload;
        setNewTokenCookie(action.payload);
      })
  },
});

export default authSlice.reducer;

export const { setTutorTrue, setParentTrue, setStateFromCookies } = authSlice.actions;

// Lấy: id, token, type_tutor, type_parent cho component
export const selectStateStatus = (state) => state.status;
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refresh_token;
export const selectId_of_user = (state) => state.auth.id;
export const selectType_tutor = (state) => state.auth.type_tutor;
export const selectType_parent = (state) => state.auth.type_parent;
export const getToken = (dispatch) => {
  const refreshToken = getRefreshTokenCookie();
  setInterval( ()=> {
    dispatch(getNewToken(refreshToken));
  }, 208800000)
}
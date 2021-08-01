import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { server_name, token_prefix } from "../../namespace";

const invitedListForTutorInforAdapter = createEntityAdapter();

const initialState = invitedListForTutorInforAdapter.getInitialState({
  status: "idle",
});

export const fetchInvitedListForTutorInfor = createAsyncThunk(
  "invitedListForTutorInfor/fetchInvitedListForTutorInfor",
  async (args) => {
    const { token } = args;
    return await fetch(`${server_name}/findTutor/listInvitedList/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
    }).then((response) => response.json());
  }
);

export const deleteInvitedListForTutorInfor = createAsyncThunk(
  "invitedListForTutorInfor/deleteInvitedListForTutorInfor",
  async (args, thunkAPI) => {
    const { invitedId, token } = args;
    return await fetch(
      `${server_name}/findTutor/listInvitedDetail/${invitedId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        // remove from invitedListForTutor
        return response.json();
      } else {
        alert("BAn khong the thuc hien hanh dong nay.");
      }
    });
  }
);

const invitedListForTutorInforSlice = createSlice({
  name: "invitedListForTutorInfor",
  initialState,
  reducers: {
    deleteForTryTeachingTutorInfor (state, action) {
      invitedListForTutorInforAdapter.removeOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitedListForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchInvitedListForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        invitedListForTutorInforAdapter.setAll(state, action.payload);
      })
      .addCase(fetchInvitedListForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      })
      .addCase(deleteInvitedListForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteInvitedListForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        invitedListForTutorInforAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteInvitedListForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      });
  },
});

export default invitedListForTutorInforSlice.reducer;

export const {deleteForTryTeachingTutorInfor} = invitedListForTutorInforSlice.actions;

export const {
  selectAll: selectInvitedListForTutorInfor,
  selectById: selectInvitedListForTutorInforByIds,
} = invitedListForTutorInforAdapter.getSelectors(
  (state) => state.tutorInfor.invitedList
);

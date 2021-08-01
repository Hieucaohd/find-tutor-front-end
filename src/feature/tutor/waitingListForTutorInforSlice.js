import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { server_name, token_prefix } from "../../namespace";

import { deleteWaitingListForTutor } from "../auth/roomRelateTutorSlice";

const waitingListForTutorInforAdapter = createEntityAdapter();

const initialState = waitingListForTutorInforAdapter.getInitialState({
  status: "idle",
});

export const fetchWaitingListForTutorInfor = createAsyncThunk(
  "waitingListForTutorInfor/fetchWaitingListForTutorInfor",
  async (args, thunkAPI) => {
    const { token } = args;
    return await fetch(`${server_name}/findTutor/waitingTutorList/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
    }).then((response) => response.json());
  }
);

export const deleteWaitingListForTutorInfor = createAsyncThunk(
  "waitingListForTutorInfor/deleteWaitingListForTutorInfor",
  async (args, thunkAPI) => {
    const { waitingId, roomId, token } = args;
    return await fetch(
      `${server_name}/findTutor/waitingTutorDetail/${waitingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        thunkAPI.dispatch(deleteWaitingListForTutor(roomId));
        return response.json();
      } else {
        alert("Ban ko the thuc hien hanh dong nay.");
      }
    });
  }
);

const waitingListForTutorInforSlice = createSlice({
  name: "waitingListForTutorInfor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitingListForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchWaitingListForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        waitingListForTutorInforAdapter.setAll(state, action.payload);
      })
      .addCase(fetchWaitingListForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      })
      .addCase(deleteWaitingListForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteWaitingListForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        waitingListForTutorInforAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteWaitingListForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      });
  },
});

export default waitingListForTutorInforSlice.reducer;

export const {
  selectAll: selectWaitingListForTutorInfor,
  selectById: selectWaitingListForTutorInforByIds,
} = waitingListForTutorInforAdapter.getSelectors(
  (state) => state.tutorInfor.waitingList
);

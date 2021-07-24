import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { deleteForInivted } from "./waitingListForRoomSlice";

const invitedListForRoomAdapter = createEntityAdapter();

const initialState = invitedListForRoomAdapter.getInitialState({
  status: "idle",
});

export const fetchInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/fetchInvitedListForRoom",
  async (args) => {
    const { roomId, token } = args;
    return await fetch(
      `http://localhost:8000/findTutor/listInvitedList/?pk_room=${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => response.json());
  }
);

export const addInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/addInvitedListForRoom",
  async (args, thunkAPI) => {
    const { waitingId, token } = args;
    return fetch(
      `http://localhost:8000/findTutor/waitingTutorDetail/${waitingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => {
      thunkAPI.dispatch(deleteForInivted(waitingId));
      return response.json();
    });
  }
);

export const deleteInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/deleteInvitedListForRoom",
  async (args, thunkAPI) => {
    const { invitedId, token } = args;
    fetch(`http://localhost:8000/findTutor/listInvitedDetail/${invitedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    return invitedId;
  }
);

const invitedListForRoomSlice = createSlice({
  name: "invitedListForRoom",
  initialState,
  reducers: {
    deleteForTryTeaching(state, action) {
      invitedListForRoomAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitedListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchInvitedListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        invitedListForRoomAdapter.setAll(state, action.payload);
      })
      .addCase(addInvitedListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addInvitedListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        invitedListForRoomAdapter.addOne(state, action.payload);
      })
      .addCase(deleteInvitedListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteInvitedListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        invitedListForRoomAdapter.removeOne(state, action.payload);
      });
  },
});

export default invitedListForRoomSlice.reducer;

export const {
  selectAll: selectInvitedListForRoom,
  selectById: selectInvitedListForRoomByIds,
} = invitedListForRoomAdapter.getSelectors(
  (state) => state.parentRoom.invitedList
);

export const { deleteForTryTeaching } = invitedListForRoomSlice.actions;

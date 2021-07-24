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
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
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
      if (response.ok) {
        thunkAPI.dispatch(deleteForInivted(waitingId));
        return response.json();
      } else {
        alert("Co loi xay ra.");
      }
    });
  }
);

export const deleteInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/deleteInvitedListForRoom",
  async (args, thunkAPI) => {
    const { invitedId, token } = args;
    return await fetch(
      `http://localhost:8000/findTutor/listInvitedDetail/${invitedId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Ban khong the thuc hien hanh dong nay.");
      }
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
        if (action.payload) {
          invitedListForRoomAdapter.setAll(state, action.payload);
        }
      })
      .addCase(fetchInvitedListForRoom.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(addInvitedListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addInvitedListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          invitedListForRoomAdapter.addOne(state, action.payload);
        }
      })
      .addCase(addInvitedListForRoom.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(deleteInvitedListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteInvitedListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          invitedListForRoomAdapter.removeOne(state, action.payload.id);
        }
      }).addCase(deleteInvitedListForRoom.rejected, (state, action) => {
        state.status = "error";
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

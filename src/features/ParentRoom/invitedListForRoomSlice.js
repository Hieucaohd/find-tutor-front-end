import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { server_name, token_prefix } from "../../namespace";

import { deleteForInivted } from "./waitingListForRoomSlice";

const invitedListForRoomAdapter = createEntityAdapter();

const initialState = invitedListForRoomAdapter.getInitialState({
  status: "idle",
});

// Lấy invitedList từ server cho lớp học.
export const fetchInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/fetchInvitedListForRoom",
  async (args) => {
    const { roomId, token } = args;
    return await fetch(
      `${server_name}/findTutor/listInvitedList/?pk_room=${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  }
);

// Sau khi mời gia sư và gia sư được thêm vào invitedList của lớp học.
export const addInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/addInvitedListForRoom",
  async (args, thunkAPI) => {
    const { waitingId, token } = args;
    return fetch(
      `${server_name}/findTutor/waitingTutorDetail/${waitingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${token}`,
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

// Xóa gia sư khỏi invitedList của lớp học.
export const deleteInvitedListForRoom = createAsyncThunk(
  "invitedListForRoom/deleteInvitedListForRoom",
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
        return response.json();
      } else {
        alert("Ban khong the thuc hien hanh dong nay.");
      }
    });
  }
);

const invitedListForRoomSlice = createSlice({
  name: "invitedListForRoom",
  initialState,
  reducers: {
    // Xóa khỏi invitedList sau khi gia sư được thêm vào tryTeachingList của lớp học.
    deleteForTryTeaching(state, action) {
      invitedListForRoomAdapter.removeOne(state, action.payload);
    },
    getInvitedListForRoom(state, action) {
      if (action.payload) {
        invitedListForRoomAdapter.setAll(state, action.payload);
      }
    }
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

export const { deleteForTryTeaching, getInvitedListForRoom } = invitedListForRoomSlice.actions;

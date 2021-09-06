import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { server_name, token_prefix } from "../../namespace";

const roomListAdapter = createEntityAdapter();

const initialState = roomListAdapter.getInitialState({
  status: "idle",
});

// Lấy danh sách các lớp từ server.
export const fetchRoomList = createAsyncThunk(
  "roomList/fetchRoomList",
  async (args) => {
    return fetch(`${server_name}/findTutor/roomList/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  }
);


// Tạo lớp học.
export const addRoom = createAsyncThunk("roomList/addRoom", async (args) => {
  const { roomInfor, token } = args;
  return fetch(`${server_name}/findTutor/roomList/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_prefix} ${token}`,
    },
    body: JSON.stringify(roomInfor),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Ban khong the thuc hien hanh dong nay.");
    }
  });
});

// xóa lớp học.
export const deleteRoom = createAsyncThunk(
  "roomList/deleteRoom",
  async (args) => {
    const { roomId, token } = args;
    return await fetch(`${server_name}/findTutor/roomDetail/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_prefix} ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Ban khong the thuc hien hanh dong nay.");
      }
    });
  }
);

const roomListSlice = createSlice({
  name: "roomList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRoomList.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          roomListAdapter.setAll(state, action.payload);
        }
      })
      .addCase(fetchRoomList.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(addRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          roomListAdapter.addOne(state, action.payload);
        }
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(deleteRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          roomListAdapter.removeOne(state, action.payload.id);
        }
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default roomListSlice.reducer;


// lấy danh sách lớp học cho component.
export const { selectAll: selectRoomList, selectById: selectRoomByIds } =
  roomListAdapter.getSelectors((state) => state.roomList);

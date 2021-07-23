import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const roomListAdapter = createEntityAdapter();

const initialState = roomListAdapter.getInitialState({
  status: "idle",
});

export const fetchRoomList = createAsyncThunk(
  "roomList/fetchRoomList",
  async (args) => {
    const { token } = args;
    return fetch("http://localhost:8000/findTutor/roomList/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then(response => response.json());
  }
);

export const addRoom = createAsyncThunk("roomList/addRoom", async (args) => {
  const { roomInfor, token } = args;
  return fetch("http://localhost:8000/findTutor/roomList/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(roomInfor),
  }).then(response => response.json());
});

export const deleteRoom = createAsyncThunk(
  "roomList/deleteRoom",
  async (args) => {
    const { roomId, token } = args;
    fetch(
      `http://localhost:8000/findTutor/roomDetail/${roomId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    return roomId;
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
        roomListAdapter.setAll(state, action.payload);
      })
      .addCase(addRoom.fulfilled, roomListAdapter.addOne)
      .addCase(deleteRoom.fulfilled, (state, { payload: id }) => {
        roomListAdapter.removeOne(state, id);
      });
  },
});

export default roomListSlice.reducer;

export const { selectAll: selectRoomList, selectById: selectRoomByIds } =
  roomListAdapter.getSelectors((state) => state.roomList);

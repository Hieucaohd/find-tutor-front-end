import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  addWaitingListForTutor,
  deleteWaitingListForTutor,
} from "../auth/roomRelateTutorSlice";

const waitingListForRoomAdapter = createEntityAdapter();

const initialState = waitingListForRoomAdapter.getInitialState({
  status: "idle",
});

export const fetchWaitingListForRoom = createAsyncThunk(
  "waitingListForRoom/fetchWaitingListForRoom",
  async (args, dispatch) => {
    const { roomId, token } = args;
    return await fetch(
      `http://localhost:8000/findTutor/waitingTutorList/?pk_room=${roomId}`,
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

export const addWaitingListForRoom = createAsyncThunk(
  "waitingListForRoom/addWaitingListForRoom",
  async (args, thunkAPI) => {
    const { roomId, token } = args;
    return await fetch(
      `http://localhost:8000/findTutor/waitingTutorList/?pk_room=${roomId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => {
      thunkAPI.dispatch(addWaitingListForTutor(roomId));
      return response.json();
    });
  }
);

export const deleteWaitingListForRoom = createAsyncThunk(
  "waitingListForRoom/deleteWaitingListForRoom",
  async (args, thunkAPI) => {
    const { waitingId, roomId, token } = args;
    fetch(`http://localhost:8000/findTutor/waitingTutorDetail/${waitingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    thunkAPI.dispatch(deleteWaitingListForTutor(roomId));
    return waitingId;
  }
);

const waitingListForRoomSlice = createSlice({
  name: "waitingListForRoom",
  initialState,
  reducers: {
    deleteForInivted(state, action) {
      waitingListForRoomAdapter.removeOne(state, action.payload);
    },
    // deleteWaitingListForRoom(state, action) {
    //   waitingListForRoomAdapter.removeOne(state, action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitingListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchWaitingListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        waitingListForRoomAdapter.setAll(state, action.payload);
      })
      .addCase(addWaitingListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addWaitingListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        waitingListForRoomAdapter.addOne(state, action.payload);
      })
      .addCase(deleteWaitingListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteWaitingListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        waitingListForRoomAdapter.removeOne(state, action.payload);
      });
  },
});

export default waitingListForRoomSlice.reducer;

export const {
  selectAll: selectWaitingListForRoom,
  selectById: selectWaitingListForRoomByIds,
} = waitingListForRoomAdapter.getSelectors(
  (state) => state.parentRoom.waitingList
);

export const { deleteForInivted } =
  waitingListForRoomSlice.actions;

export const selectWaitingListForRoomStatus = (state) =>
  state.parentRoom.waitingList.status;

// export const deleteFromWaitingListForRoom = async (args) => {
//   const { waitingId, roomId, token, dispatch } = args;
//   return await fetch(
//     `http://localhost:8000/findTutor/waitingTutorDetail/${waitingId}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//     }
//   ).then((response) => {
//     if (response.ok) {
//       const data_from_response = response.json();
//       data_from_response.then((data) => {
//         dispatch(
//           waitingListForRoomSlice.actions.deleteWaitingListForRoom(waitingId)
//         );
//         dispatch(deleteWaitingListForTutor(roomId));
//       });
//     } else {
//       alert("Ban ko the thuc hien hanh dong nay.");
//     }
//   });
//   // dispatch(deleteWaitingListForTutor(roomId));
//   // return waitingId;
// };

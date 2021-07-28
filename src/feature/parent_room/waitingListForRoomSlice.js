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

// lấy danh sách waitingList của lớp học từ server.
export const fetchWaitingListForRoom = createAsyncThunk(
  "waitingListForRoom/fetchWaitingListForRoom",
  async (args, dispatch) => {
    const { roomId, token } = args;
    return fetch(
      `http://localhost:8000/findTutor/waitingTutorList/?pk_room=${roomId}`,
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
      } else {
        alert("Co loi xay ra, co the lop hoc da bi xoa.");
      }
    });
  }
);

// Gia sư ứng tuyển và thêm gia sư vào danh sách ứng tuyển (waitingList) của lớp học.
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
      if (response.ok) {
        thunkAPI.dispatch(addWaitingListForTutor(roomId));
        return response.json();
      } else {
        alert(
          "Ban khong the thuc hien hanh dong nay, co the lop hoc da bi xoa."
        );
      }
    });
  }
);

// Xóa gia sư khỏi danh sách ứng tuyển (waitingList) của lớp học.
export const deleteWaitingListForRoom = createAsyncThunk(
  "waitingListForRoom/deleteWaitingListForRoom",
  async (args, thunkAPI) => {
    const { waitingId, roomId, token } = args;
    return await fetch(
      `http://localhost:8000/findTutor/waitingTutorDetail/${waitingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
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

const waitingListForRoomSlice = createSlice({
  name: "waitingListForRoom",
  initialState,
  reducers: {
    // Sau khi gia sư được phụ huynh mời vào invitedList thì xóa gia sư khỏi waitingList.
    deleteForInivted(state, action) {
      waitingListForRoomAdapter.removeOne(state, action.payload);
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitingListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchWaitingListForRoom.fulfilled, (state, action) => {
        state.status = "idle";

        if (action.payload) {
          waitingListForRoomAdapter.setAll(state, action.payload);
        }
      }).addCase(fetchWaitingListForRoom.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(addWaitingListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addWaitingListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          waitingListForRoomAdapter.addOne(state, action.payload);
        }
      })
      .addCase(addWaitingListForRoom.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(deleteWaitingListForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteWaitingListForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          waitingListForRoomAdapter.removeOne(state, action.payload.id);
        }
      })
      .addCase(deleteWaitingListForRoom.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default waitingListForRoomSlice.reducer;

// Lấy danh sách waitingList cho component.
export const {
  selectAll: selectWaitingListForRoom,
  selectById: selectWaitingListForRoomByIds,
} = waitingListForRoomAdapter.getSelectors(
  (state) => state.parentRoom.waitingList
);

export const { deleteForInivted } = waitingListForRoomSlice.actions;

// export const selectWaitingListForRoomStatus = (state) =>
//   state.parentRoom.waitingList.status;



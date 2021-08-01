import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server_name, token_prefix } from "../../namespace";

const initialState = {
  status: "idle",
  list_room_waiting: [],
  list_room_invited: [],
  list_room_try_teaching: [],
  list_room_teaching: [],
};

export const fetchRoomRelateTutor = createAsyncThunk(
  "roomRelateTutor/fetchRoomRelateTutor",
  async (args) => {
    const { token } = args;
    return await fetch(
      `${server_name}/findTutor/informationAboutRoomOfTutorList/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${token}`,
        },
      }
    ).then((response) => response.json());
  }
);

const roomRelateTutorSlice = createSlice({
  name: "roomRelateTutor",
  initialState,
  reducers: {
    addWaitingListForTutor(state, action) {
      state.list_room_waiting.push(action.payload);
    },
    deleteWaitingListForTutor: {
      reducer: (state, action) => {
        if (state.list_room_waiting) {
          state.list_room_waiting = action.payload.arrayRemove(
            state.list_room_waiting,
            action.payload.roomId
          );
        }
      },
      prepare: (roomId) => {
        function arrayRemove(arr, value) {
          return arr.filter(function (geeks) {
            return geeks !== value;
          });
        }

        return { payload: { roomId: roomId, arrayRemove: arrayRemove } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomRelateTutor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRoomRelateTutor.fulfilled, (state, action) => {
        state.status = "idle";
        const {
          list_room_waiting,
          list_room_invited,
          list_room_try_teaching,
          list_room_teaching,
        } = action.payload;
        state.list_room_waiting = list_room_waiting;
        state.list_room_invited = list_room_invited;
        state.list_room_try_teaching = list_room_try_teaching;
        state.list_room_teaching = list_room_teaching;
      });
  },
});

export default roomRelateTutorSlice.reducer;

export const selectWaitingListForTutor = (state) =>
  state.roomRelateTutor.list_room_waiting;

  export const selectInvitedListForTutor = (state) =>
  state.roomRelateTutor.list_room_invited;

  export const selectTryTeachingForTutor = (state) =>
  state.roomRelateTutor.list_room_try_teaching;

  export const selectTeachingForTutor = (state) =>
  state.roomRelateTutor.list_room_teaching;

export const { addWaitingListForTutor, deleteWaitingListForTutor } =
  roomRelateTutorSlice.actions;

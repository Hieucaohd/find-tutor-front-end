import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
import { server_name, token_prefix } from "../../namespace";
import { fetchRoomList } from "../home/getRoom";

const parentRoomAdapter = createEntityAdapter();

const initialState = parentRoomAdapter.getInitialState({
    status: "idle",
});

const fetchParentRoomList = createAsyncThunk(
    "fetchParentRoomList",
    async ({parentId}) => {
        try {
            const roomList = await fetchRoomList();
            const parentRooms = await roomList.filter( (room) => room.parent === Number(parentId));
            return parentRooms;
        } catch(error) {
            console.log("failed to get parent room: ", error)
        }
    }
)

const deleteRoom = createAsyncThunk(
    "deleteRoom",
    async (args) => {
        try {
            const { roomId, token } = args;
            return await fetch(`${server_name}/findTutor/roomDetail/${roomId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${token_prefix} ${token}`,
                },
            })
        } catch(error) {
            console.log("Failed to delete parent room: ", error)
        }
    }
)


const parentRoomSlice = createSlice({
    name: "parentRoom",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParentRoomList.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchParentRoomList.fulfilled, (state, action) => {
                state.status = "idle";
                if (action.payload) {
                    parentRoomAdapter.setAll(state, action.payload);
                }
            })
            .addCase(fetchParentRoomList.rejected, (state, action) => {
                state.status = "error";
            })
            .addCase(deleteRoom.pending, (state, action) => {
                state.status = "loading";
            })
              .addCase(deleteRoom.fulfilled, (state, action) => {
                state.status = "idle";
                if (action.payload) {
                    parentRoomAdapter.removeOne(state, action.payload.id);
                }
            })
              .addCase(deleteRoom.rejected, (state, action) => {
                state.status = "error";
            })
    },
})

export default parentRoomSlice.reducer;

export const { selectAll: selectRoomList } = parentRoomAdapter.getSelectors((state) => state.parentRoom);
 
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  deleteForTeaching,
  upsertForTeaching,
} from "./tryTeachingForRoomSlice";

const teachingForRoomAdapter = createEntityAdapter();

const initialState = teachingForRoomAdapter.getInitialState({
  status: "idle",
});

export const fetchTeachingForRoom = createAsyncThunk(
  "teachingForRoom/fetchTeachingForRoom",
  async (args) => {
    const { roomId, token } = args;
    return await fetch(
      `http://localhost:8000/findTutor/teachingList/?pk_room=${roomId}`,
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

// export const addTeachingForRoom = createAsyncThunk(
//   "teachingForRoom/addTeachingForRoom",
//   async (args, thunkAPI) => {
//     const { try_teachingId, token } = args;
//     return await fetch(
//       `http://localhost:8000/findTutor/tryTeachingDetail/${try_teachingId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`,
//         },
//       }
//     ).then((response) => {
//       if (response.ok) {
//         // console.log(response);
//         // console.log(response.json());
//         const data_from_response = response.json();
//         data_from_response.then((data) => {
//           if (!(data.tutor_agree && data.parent_agree)) {
//             thunkAPI.dispatch(upsertForTeaching(data));
//           } else {
//             thunkAPI.dispatch(deleteForTeaching(try_teachingId));
//           }
//         });

//         return response.json();
//       } else {
//         alert("Ban khong duoc phep thuc hien hanh dong nay.");
//         return response.json();
//       }
//     });
//   }
// );

const teachingForRoomSlice = createSlice({
  name: "teachingForRoom",
  initialState,
  reducers: {
    addTeachingForRoom(state, action) {
      teachingForRoomAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachingForRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeachingForRoom.fulfilled, (state, action) => {
        state.status = "idle";
        teachingForRoomAdapter.setAll(state, action.payload);
      });
    // .addCase(addTeachingForRoom.pending, (state, action) => {
    //   state.status = "loading";
    // })
    // .addCase(addTeachingForRoom.fulfilled, (state, action) => {
    //   state.status = "idle";
    //   teachingForRoomAdapter.addOne(state, action.payload);
    // })
    // .addCase(addTeachingForRoom.rejected, (state, action) => {
    //   state.status = action.error;
    //   state.takeMeta = action.meta;
    // });
  },
});

export default teachingForRoomSlice.reducer;

export const { addTeachingForRoom } = teachingForRoomSlice.actions;

export const {
  selectAll: selectTeachingForRoom,
  selectById: selectTeachingForRoomByIds,
} = teachingForRoomAdapter.getSelectors((state) => state.parentRoom.teaching);

export const addToTeachingForRoom = async (args) => {
  const { try_teachingId, token, dispatch } = args;
  return await fetch(
    `http://localhost:8000/findTutor/tryTeachingDetail/${try_teachingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  ).then((response) => {
    if (response.ok) {
      // console.log(response);
      // console.log(response.json());
      const data_from_response = response.json();
      data_from_response.then((data) => {
        if (!(data.tutor_agree && data.parent_agree)) {
          dispatch(upsertForTeaching(data));
          return;
        } else {
          dispatch(deleteForTeaching(try_teachingId));
          dispatch(teachingForRoomSlice.actions.addTeachingForRoom(data));
        }
      });

      
    } else {
      alert("Ban khong duoc phep thuc hien hanh dong nay.");
      return response.json();
    }
  });
};

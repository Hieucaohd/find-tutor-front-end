import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const teachingForTutorInforAdapter = createEntityAdapter();

const initialState = teachingForTutorInforAdapter.getInitialState({
  status: "idle",
});

export const fetchTeachingForTutorInfor = createAsyncThunk(
  "teachingForTutorInfor/fetchTeachingForTutorInfor",
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

export const addTeachingForTutorInfor = createAsyncThunk(
  "teachingForTutorInfor/addTeachingForTutorInfor",
  async (args, thunkAPI) => {
    const { try_teachingId, token } = args;
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
        return response.json();
      } else {
        alert("Ban khong duoc phep thuc hien hanh dong nay.");
        return response.json();
      }
    });
  }
);

const teachingForTutorInforSlice = createSlice({
  name: "teachingForTutorInfor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachingForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeachingForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        teachingForTutorInforAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTeachingForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      })
      .addCase(addTeachingForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTeachingForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        teachingForTutorInforAdapter.addOne(state, action.payload);
      })
      .addCase(addTeachingForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      });
  },
});

export default teachingForTutorInforSlice.reducer;

export const {
  selectAll: selectTeachingForTutorInfor,
  selectById: selectTeachingForTutorInforByIds,
} = teachingForTutorInforAdapter.getSelectors(
  (state) => state.tutorInfor.teaching
);
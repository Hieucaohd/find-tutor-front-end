import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { deleteForTryTeachingTutorInfor } from "./invitedListForTutorInforSlice";

import { server_name, token_prefix } from "../../namespace";
import { GetTutorTryTeachingList } from "graphql/TutorRoomQueries";

const tryTeachingForTutorInforAdapter = createEntityAdapter();

const initialState = tryTeachingForTutorInforAdapter.getInitialState({
  status: "idle",
});

export const fetchTryTeachingForTutorInfor = createAsyncThunk(
  "tryTeachingForTutorInfor/fetchTryTeachingForTutorInfor",
  async (args) => {
    const {id} = args; 
    const list = await GetTutorTryTeachingList(id);
    return list;
  }
);

export const addTryTeachingForTutorInfor = createAsyncThunk(
  "tryTeachingForTutorInfor/addTryTeachingForTutorInfor",
  async (args, thunkAPI) => {
    const { invitedId, token } = args;
    return await fetch(
      `${server_name}/findTutor/listInvitedDetail/${invitedId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_prefix} ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        thunkAPI.dispatch(deleteForTryTeachingTutorInfor(invitedId));
        return response.json();
      } else {
        alert("Lop hoc da co nguoi day thu, xin hay cho luot sau.");
        return response.json();
      }
    });
  }
);

export const deleteTryTeachingForTutorInfor = createAsyncThunk(
  "tryTeachingForTutorInfor/deleteTryTeachingForTutorInfor",
  async (args, thunkAPI) => {
    const { try_teachingId, token } = args;
    return await fetch(
      `${server_name}/findTutor/tryTeachingDetail/${try_teachingId}`,
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
        return response.json();
      }
    });
  }
);

const tryTeachingForTutorInforSlice = createSlice({
  name: "tryTeachingForTutorInfor",
  initialState,
  reducers: {
    deleteForTeachingTutorInfor(state, action) {
      tryTeachingForTutorInforAdapter.removeOne(state, action.payload);
    },
    upsertForTeachingTutorInfor(state, action) {
      tryTeachingForTutorInforAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTryTeachingForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTryTeachingForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        tryTeachingForTutorInforAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTryTeachingForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      })
      .addCase(addTryTeachingForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTryTeachingForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        tryTeachingForTutorInforAdapter.addOne(state, action.payload);
      })
      .addCase(addTryTeachingForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      })
      .addCase(deleteTryTeachingForTutorInfor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTryTeachingForTutorInfor.fulfilled, (state, action) => {
        state.status = "idle";
        tryTeachingForTutorInforAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteTryTeachingForTutorInfor.rejected, (state, action) => {
        state.status = "error";
        state.takeError = action.error;
        state.takeMeta = action.meta;
      });
  },
});

export default tryTeachingForTutorInforSlice.reducer;

export const {
  selectAll: selectTryTeachingForTutorInfor,
  selectById: selectTryTeachingForTutorInforByIds,

} = tryTeachingForTutorInforAdapter.getSelectors(
  (state) => state.tutorInfor.tryTeaching
);

export const { deleteForTeachingTutorInfor, upsertForTeachingTutorInfor } =
  tryTeachingForTutorInforSlice.actions;

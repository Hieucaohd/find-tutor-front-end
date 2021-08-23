
import waitingListForRoomReducer from "./waitingListForRoomSlice";
import invitedListForRoomReducer from "./invitedListForRoomSlice";
import tryTeachingForRoomReducer from "./tryTeachingForRoomSlice";
import teachingForRoomReducer from "./teachingForRoomSlice";

import { combineReducers } from "redux";

export const parentRoomReducer = combineReducers({
  status: "idle",
  waitingList: waitingListForRoomReducer,
  invitedList: invitedListForRoomReducer,
  tryTeaching: tryTeachingForRoomReducer,
  teaching: teachingForRoomReducer,
});

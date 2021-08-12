import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./feature/auth/authSlice";
import roomListReducer from "./feature/home/homeSlice"
import { parentRoomReducer } from "./feature/parent_room/parentRoomSlice";
import roomRelateTutorReducer from "./feature/auth/roomRelateTutorSlice";
import { tutorInforReducer } from "./feature/tutor/tutorInforSlice";
import { parentRoomListReducer } from "./feature/parent/parentRoomSlice";
const store = configureStore({
  reducer: {
    roomList: roomListReducer,
    auth: authReducer,
    parentRoom: parentRoomReducer,
    roomRelateTutor: roomRelateTutorReducer,
    tutorInfor: tutorInforReducer,
  },
});

export default store;
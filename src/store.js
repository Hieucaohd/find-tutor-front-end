import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import roomListReducer from "./features/home/homeSlice"
import { parentRoomReducer } from "./features/parent_room/parentRoomSlice";
import roomRelateTutorReducer from "./features/auth/roomRelateTutorSlice";
import { tutorInforReducer } from "./features/tutor/tutorInforSlice";

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
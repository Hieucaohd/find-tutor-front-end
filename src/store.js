import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import roomListReducer from "./features/Home/homeSlice"
import { parentRoomReducer } from "./features/ParentRoom/parentRoomSlice";
import roomRelateTutorReducer from "./features/auth/roomRelateTutorSlice";
import { tutorInforReducer } from "./features/Tutor/tutorInforSlice";

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
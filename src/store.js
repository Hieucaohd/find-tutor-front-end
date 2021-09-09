import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import { parentRoomReducer } from "./features/ParentRoom/parentRoomSlice";
import roomRelateTutorReducer from "./features/auth/roomRelateTutorSlice";
import { tutorInforReducer } from "./features/Tutor/tutorInforSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parentRoom: parentRoomReducer,
    roomRelateTutor: roomRelateTutorReducer,
    tutorInfor: tutorInforReducer,
  },
});

export default store;
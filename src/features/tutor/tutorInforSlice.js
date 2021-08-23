import waitingListForTutorInforReducer from "./waitingListForTutorInforSlice";
import invitedListForTutorInforReducer from "./invitedListForTutorInforSlice";
import tryTeachingForTutorInforReducer from "./tryTeachingForTutorInforSlice";
import teachingForTutorInforReducer from "./teachingForTutorInforSlice";

import { combineReducers } from "redux";

export const tutorInforReducer = combineReducers({
    status: "idle",
    waitingList: waitingListForTutorInforReducer,
    invitedList: invitedListForTutorInforReducer,
    tryTeaching: tryTeachingForTutorInforReducer,
    teaching: teachingForTutorInforReducer,
})
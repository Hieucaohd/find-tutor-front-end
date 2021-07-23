import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectToken } from "../auth/authSlice";

import {
  selectWaitingListForTutorInfor,
  fetchWaitingListForTutorInfor,
} from "./waitingListForTutorInforSlice";
import {
  selectInvitedListForTutorInfor,
  fetchInvitedListForTutorInfor,
} from "./invitedListForTutorInforSlice";
import {
  selectTryTeachingForTutorInfor,
  fetchTryTeachingForTutorInfor,
} from "./tryTeachingForTutorInforSlice";
import {
  selectTeachingForTutorInfor,
  fetchTeachingForTutorInfor,
} from "./teachingForTutorInforSlice";

function TutorInfor() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      // dispatch something here.
      dispatch(fetchWaitingListForTutorInfor({ token }));
      dispatch(fetchInvitedListForTutorInfor({ token }));
      dispatch(fetchTryTeachingForTutorInfor({ token }));
      dispatch(fetchTeachingForTutorInfor({ token }));
    }
  }, [token]);

  const waitingList = useSelector(selectWaitingListForTutorInfor);
  const renderWaitingList = waitingList.map((waiting) => {
    return (
      <div>
        <li key={waiting.id}>
          id: {waiting.id}, parent_room: {waiting.parent_room}
          <button>delete</button>
        </li>
      </div>
    );
  });

  const invitedList = useSelector(selectInvitedListForTutorInfor);
  const renderInvitedList = invitedList.map((invited) => {
    return (
      <div>
        <li key={invited.id}>
          id: {invited.id}, parent_room: {invited.parent_room}
          <button>Dong y day thu</button>
          <button>Khong dong y day thu</button>
        </li>
      </div>
    );
  });

  const tryTeaching = useSelector(selectTryTeachingForTutorInfor);
  const renderTryTeaching = tryTeaching.map((try_teaching) => {
    return (
      <div>
        <li key={try_teaching.id}>
          id: {try_teaching.id}, parent_room: {try_teaching.parent_room}
          <button>Dong y day chinh thuc</button>
          <button>Khong muon day tiep</button>
        </li>
      </div>
    );
  });

  const teaching = useSelector(selectTeachingForTutorInfor);
  const renderTeaching = teaching.map((teach) => {
    return (
      <div>
        <li key={teach.id}>
          id: {teach.id}, parent_room: {teach.parent_room}
        </li>
      </div>
    );
  });

  return (
    <div>
      <ul>{renderWaitingList}</ul>
      <ul>{renderInvitedList}</ul>
      <ul>{renderTryTeaching}</ul>
      <ul>{renderTeaching}</ul>
    </div>
  );
}

export default TutorInfor;

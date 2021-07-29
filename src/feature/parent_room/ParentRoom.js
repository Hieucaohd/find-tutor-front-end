import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectRoomList } from "../home/homeSlice";

import { renderThem } from "../home/conditionFunctionToRender";

import {
  selectWaitingListForRoom,
  fetchWaitingListForRoom,
  addWaitingListForRoom,
  deleteWaitingListForRoom,
} from "./waitingListForRoomSlice";
import {
  selectInvitedListForRoom,
  fetchInvitedListForRoom,
  addInvitedListForRoom,
  deleteInvitedListForRoom,
  deleteForTryTeaching,
} from "./invitedListForRoomSlice";
import {
  selectTryTeachingForRoom,
  fetchTryTeachingForRoom,
  addTryTeachingForRoom,
  deleteForTeaching,
  deleteTryTeachingForRoom,
} from "./tryTeachingForRoomSlice";
import {
  selectTeachingForRoom,
  fetchTeachingForRoom,
  addTeachingForRoom,
  addToTeachingForRoom,
} from "./teachingForRoomSlice";

import {
  fetchRoomRelateTutor,
  selectWaitingListForTutor,
  selectInvitedListForTutor,
  selectTryTeachingForTutor,
  selectTeachingForTutor,
} from "../auth/roomRelateTutorSlice";


import WaitingList from "./component/WaitingList";
import InvitedList from "./component/InvitedList";
import TryTeaching from "./component/TryTeaching";
import Teaching from "./component/Teaching";
import { useRouteMatch } from "react-router-dom";
import { selectToken, selectId_of_user, selectType_tutor, } from "../auth/authSlice";

ParentRoom.propTypes = {
  
};

function ParentRoom(props) {
  const dispatch = useDispatch();
  const {
    params: {roomId}
  } = useRouteMatch();
  const token = useSelector(selectToken);

  const type_tutor = useSelector(selectType_tutor); 
  const roomList = useSelector(selectRoomList);
  const list_room_waiting = useSelector(selectWaitingListForTutor);
  const list_room_invited = useSelector(selectInvitedListForTutor);
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor);
  const roomDetail = roomList.find((room) => room.id === Number(roomId) );

  const userId = Number(useSelector(selectId_of_user));
  useEffect(() => {
    const args = {
      roomId: roomId,
      token: token
    }

    dispatch(fetchWaitingListForRoom(args));
    dispatch(fetchInvitedListForRoom(args));
    dispatch(fetchTryTeachingForRoom(args));
    dispatch(fetchTeachingForRoom(args));
  }, [])
  
  const waitingList = useSelector(selectWaitingListForRoom);
  const renderWaitingList = waitingList.map((waiting) => {
    return (
      <div>
        <WaitingList waiting={waiting} userId={userId} roomId={roomId} />
      </div>
    );
  });

  const invitedList = useSelector(selectInvitedListForRoom);
  const renderInvitedList = invitedList.map((invited) => {
    return (
      <div>
        <InvitedList invited={invited} userId={userId} />
      </div>
    );
  });

  const tryTeaching = useSelector(selectTryTeachingForRoom);
  const renderTryTeaching = tryTeaching.map((tryTeach) => {
    return (
      <div>
        <TryTeaching
          tryTeach={tryTeach}
          userId={userId}
        />
      </div>
    );
  });

  const teaching = useSelector(selectTeachingForRoom);
  const renderTeaching = teaching.map((teach) => {
    return <Teaching teach={teach} />;
  });
  const addToWaitingList = (roomId) => {
    dispatch(addWaitingListForRoom({ roomId: roomId, token: token }));
  };

  return (
    <div>
      <div>
        room detail: {roomDetail.id}, {roomDetail.location}
        {type_tutor === "true" &&
        renderThem(
          roomDetail.id,
          list_room_waiting,
          list_room_invited,
          list_room_try_teaching
        ) ? (
          <button onClick={() => addToWaitingList(roomDetail.id)}>them</button>
        ) : null}
      </div>
      waiting list: <ul>{renderWaitingList}</ul>
      invited list: <ul>{renderInvitedList}</ul>
      try teaching: <ul>{renderTryTeaching}</ul>
      teaching: <ul>{renderTeaching}</ul>
    </div>
  );
}

export default ParentRoom;
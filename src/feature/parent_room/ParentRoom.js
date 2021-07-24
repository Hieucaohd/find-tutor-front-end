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

function ParentRoom(props) {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState();

  const [type_tutor, setType_tutor] = useState("");
  const [token, setToken] = useState("");

  const list_room_waiting = useSelector(selectWaitingListForTutor);
  const list_room_invited = useSelector(selectInvitedListForTutor);
  const list_room_try_teaching = useSelector(selectTryTeachingForTutor);

  const [roomDetail, setRoomDetail] = useState(<div></div>);

  useEffect(() => {
    const args = {
      roomId: props.room.id,
      token: props.token,
    };

    dispatch(fetchWaitingListForRoom(args));
    dispatch(fetchInvitedListForRoom(args));
    dispatch(fetchTryTeachingForRoom(args));
    dispatch(fetchTeachingForRoom(args));

    setRoomDetail(props.room);
    setUserId(props.userId);
    setType_tutor(props.type_tutor);
    setToken(props.token);
  }, [props.room]);

  // const deleteFromWaitingList = (waitingId) => {
  //   dispatch(
  //     deleteWaitingListForRoom({
  //       waitingId: waitingId,
  //       roomId: props.room.id,
  //       token: token,
  //     })
  //   );
  // };

  // const addToInvitedList = (waitingId) => {
  //   dispatch(addInvitedListForRoom({ waitingId: waitingId, token: token }));
  // };

  const waitingList = useSelector(selectWaitingListForRoom);
  const renderWaitingList = waitingList.map((waiting) => {
    return (
      <div>
        <WaitingList waiting={waiting} userId={userId} roomId={props.room.id} />
      </div>
    );
  });

  // const deleteFromInvitedList = (invitedId) => {
  //   dispatch(deleteInvitedListForRoom({ invitedId: invitedId, token: token }));
  // };

  // const addToTryTeaching = (invitedId) => {
  //   dispatch(
  //     addTryTeachingForRoom({
  //       invitedId: invitedId,
  //       token: token,
  //     })
  //   );
  // };

  const invitedList = useSelector(selectInvitedListForRoom);
  const renderInvitedList = invitedList.map((invited) => {
    return (
      <div>
        <InvitedList invited={invited} userId={userId} />
      </div>
    );
  });

  // const addToTeaching = (try_teachingId) => {
  //   addToTeachingForRoom({
  //     try_teachingId: try_teachingId,
  //     token: token,
  //     dispatch: dispatch,
  //   });
  // };

  // const deleteFromTryTeaching = (try_teachingId) => {
  //   dispatch(
  //     deleteTryTeachingForRoom({ try_teachingId: try_teachingId, token: token })
  //   );
  // };

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
      <button onClick={props.closeRoomDetail}>Close</button>
    </div>
  );
}

export default ParentRoom;

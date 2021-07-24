import React from "react";

import { deleteWaitingListForRoom } from "../waitingListForRoomSlice";
import { addInvitedListForRoom } from "../invitedListForRoomSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../auth/authSlice";

function WaitingList({ waiting, userId, roomId }) {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const deleteFromWaitingList = (waitingId) => {
    dispatch(
      deleteWaitingListForRoom({
        waitingId: waitingId,
        roomId: roomId,
        token: token,
      })
    );
  };

  const addToInvitedList = (waitingId) => {
    dispatch(addInvitedListForRoom({ waitingId: waitingId, token: token }));
  };

  return (
    <li key={waiting.id}>
      id: {waiting.id}, tutor: {waiting.tutor}, parent_room_id:
      {waiting.parent_room}
      {waiting.parent_room === userId ? (
        <button onClick={() => addToInvitedList(waiting.id)}>invite</button>
      ) : null}
      {waiting.tutor === userId || waiting.parent_room === userId ? (
        <button onClick={() => deleteFromWaitingList(waiting.id)}>
          delete
        </button>
      ) : null}
    </li>
  );
}

export default WaitingList;

import React from "react";

function WaitingList({
  waiting,
  deleteFromWaitingList,
  addToInvitedList,
  userId,
}) {
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

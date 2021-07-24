import React from "react";

function InvitedList({
  invited,
  addToTryTeaching,
  deleteFromInvitedList,
  userId,
}) {
  return (
    <div>
      <li key={invited.id}>
        id: {invited.id}, tutor: {invited.tutor}, parent_invited:
        {invited.parent_room}
        {invited.tutor === userId ? (
          <button onClick={() => addToTryTeaching(invited.id)}>accept</button>
        ) : null}
        {invited.tutor === userId || invited.parent_room === userId ? (
          <button onClick={() => deleteFromInvitedList(invited.id)}>
            delete
          </button>
        ) : null}
      </li>
    </div>
  );
}

export default InvitedList;

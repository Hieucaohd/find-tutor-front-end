import React from "react";

import { addToTeachingForRoom } from "../teachingForRoomSlice";
import { deleteTryTeachingForRoom } from "../tryTeachingForRoomSlice";

import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../auth/authSlice";

function TryTeaching({tryTeach, userId}) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const addToTeaching = (try_teachingId) => {
    addToTeachingForRoom({
      try_teachingId: try_teachingId,
      token: token,
      dispatch: dispatch,
    });
  };

  const deleteFromTryTeaching = (try_teachingId) => {
    dispatch(
      deleteTryTeachingForRoom({ try_teachingId: try_teachingId, token: token })
    );
  };
  return (
    <div>
      <li key={tryTeach.id}>
        id: {tryTeach.id}, tutor: {tryTeach.tutor}, parent_try_teach:
        {tryTeach.parent_room}
        {tryTeach.parent_room === userId && !tryTeach.parent_agree ? (
          <button onClick={() => addToTeaching(tryTeach.id)}>
            Dong y thue
          </button>
        ) : null}
        {tryTeach.parent_agree && tryTeach.parent_room === userId ? (
          <button>Cho gia su dong y</button>
        ) : null}
        {tryTeach.tutor === userId && !tryTeach.tutor_agree ? (
          <button onClick={() => addToTeaching(tryTeach.id)}>
            Dong y day chinh thuc
          </button>
        ) : null}
        {tryTeach.tutor_agree && tryTeach.tutor === userId ? (
          <button>Cho phu huynh dong y</button>
        ) : null}
        {tryTeach.tutor === userId ? (
          <button onClick={() => deleteFromTryTeaching(tryTeach.id)}>
            Khong day tiep
          </button>
        ) : null}
        {tryTeach.parent_room === userId ? (
          <button onClick={() => deleteFromTryTeaching(tryTeach.id)}>
            Khong muon tiep tuc thue
          </button>
        ) : null}
      </li>
    </div>
  );
}

export default TryTeaching;

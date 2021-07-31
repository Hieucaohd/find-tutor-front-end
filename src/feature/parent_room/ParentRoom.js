import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { selectId_of_user, selectToken, selectType_tutor } from "../auth/authSlice";
import {
  selectInvitedListForTutor,
  selectTryTeachingForTutor, selectWaitingListForTutor
} from "../auth/roomRelateTutorSlice";
import { renderThem } from "../home/conditionFunctionToRender";
import { selectRoomList } from "../home/homeSlice";
import InvitedList from "./component/InvitedList";
import Teaching from "./component/Teaching";
import TryTeaching from "./component/TryTeaching";
import WaitingList from "./component/WaitingList";
import {
  fetchInvitedListForRoom, selectInvitedListForRoom
} from "./invitedListForRoomSlice";
import {
  fetchTeachingForRoom, selectTeachingForRoom
} from "./teachingForRoomSlice";
import {
  fetchTryTeachingForRoom, selectTryTeachingForRoom
} from "./tryTeachingForRoomSlice";
import {
  addWaitingListForRoom, fetchWaitingListForRoom, selectWaitingListForRoom
} from "./waitingListForRoomSlice";
import "./styles.scss"


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
    <div className="parentroom">
      <div>
        room detail: {roomDetail?.id}, {roomDetail?.location}
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
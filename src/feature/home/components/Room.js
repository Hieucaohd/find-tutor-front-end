import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteRoom } from "../homeSlice";
import { addWaitingListForRoom } from "../../parent_room/waitingListForRoomSlice";
import { renderThem } from "../conditionFunctionToRender";

import ParentRoom from "../../parent_room/ParentRoom";

function Room({
  room,
  token,
  // handleDeleteRoom,
  // showRoomDetail,
  // addToWaitingList,
  list_room_waiting,
  list_room_invited,
  list_room_try_teaching,
  id_of_user,
  type_tutor,
  // renderThem,
}) {
  const dispatch = useDispatch();
  const [roomDetail, setRoomDetail] = useState(<div></div>);
  const [isRenderRoomDetail, setIsRenderRoomDetail] = useState(false);

  const handleDeleteRoom = (roomId) => {
    dispatch(deleteRoom({ roomId: roomId, token: token }));
  };

  const addToWaitingList = (roomId) => {
    dispatch(addWaitingListForRoom({ roomId: roomId, token: token }));
  };

  const closeRoomDetail = () => {
    setIsRenderRoomDetail(false);
  }

  const showRoomDetail = (room) => {
    setIsRenderRoomDetail(true);
    setRoomDetail(
      <ParentRoom
        room={room}
        token={token}
        userId={id_of_user}
        type_tutor={String(type_tutor)}
        closeRoomDetail={closeRoomDetail}
      />
    );
  };

  return (
    <div>
      <li key={room.id}>
        subject: {room.subject}, lop: {room.lop}, location: {room.location},
        parent_id: {room.parent}, other_require: {room.other_require},
        day_can_teach:{room.day_can_teach}
        <div>
          {room.parent === id_of_user ? (
            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
          ) : null}
        </div>
        <div>
          {String(type_tutor) === "true" &&
          renderThem(
            room.id,
            list_room_waiting,
            list_room_invited,
            list_room_try_teaching
          ) ? (
            <button onClick={() => addToWaitingList(room.id)}>Them</button>
          ) : null}
        </div>
        <div>
          <button onClick={() => showRoomDetail(room)}>show detail</button>
        </div>
      </li>
      {isRenderRoomDetail && <div>{roomDetail}</div>}
    </div>
  );
}

export default Room;

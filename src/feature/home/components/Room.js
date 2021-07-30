import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addWaitingListForRoom } from "../../parent_room/waitingListForRoomSlice";
import { renderThem } from "../conditionFunctionToRender";
import { deleteRoom } from "../homeSlice";


function Room({
  room,
  token,

  list_room_waiting,
  list_room_invited,
  list_room_try_teaching,
  id_of_user,
  type_tutor,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteRoom = (roomId) => {
    dispatch(deleteRoom({ roomId: roomId, token: token }));
  };

  const addToWaitingList = (roomId) => {
    dispatch(addWaitingListForRoom({ roomId: roomId, token: token }));
  };

  const handleShowDetailRoom = (room) => {
      //navigate to detail room
      history.push(`/room/${room.id}`);
  }

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
          <button onClick={ () => handleShowDetailRoom(room)}>show detail</button>
        </div>
      </li>
    </div>
  );
}

export default Room;
